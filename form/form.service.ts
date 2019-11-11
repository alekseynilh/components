import { Form } from './form';
import { AppService } from '../app.service';
import { Observable, fromEvent, of } from 'rxjs';
import { catchError, filter, repeat, switchMap, tap, delay, map } from 'rxjs/operators';
import { FormModel } from './form.model';
import { FormValidator } from './validator/form.validator';
import { Error } from '../helpers/models/Error';
import { ErrorComponent } from '../helpers/error.component';
import { Registration } from './registration';
import { SubmitEffects } from '../misc/submit-effects';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export class FormService {
  readonly allowedPhoneSymbols = ['(', ')', '+', ' ', '-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  readonly apiFormUrl = '/api';
  private validator: FormValidator;
  private errorComponent: ErrorComponent;
  private effects: SubmitEffects;
  private bookSubject$: BehaviorSubject<Registration> = new BehaviorSubject(null);
  constructor(
    private appService: AppService,
  ) {
    this.validator = new FormValidator();
    this.effects = new SubmitEffects();
    this.errorComponent = new ErrorComponent();
  }

  /**
   *
   * @param {FormModel} form
   * @returns {Observable<Registration | boolean>}
   */
  public formSubmit(form: FormModel): Observable<Registration | boolean> {
    return fromEvent(form.form, 'submit')
      .pipe(
        tap((event: MouseEvent) => event.preventDefault()),
        filter(() => this.validator.validate(form.checkElements)),
        tap(() => this.effects.startLoader()),
        switchMap(() => this.register(form.getData())),
        switchMap((response: Registration) =>
          response.book ?
            this.bookAction(response, form) :
            this.defaultAction(response, form),
        ),
        catchError(error => this.handleError(error.error as Error, form)),
        repeat(),
      );
  }

  /**
   *
   * @param {HTMLElement | HTMLInputElement} element
   * @returns {Observable<Event>}
   */
  public validateElement(element: HTMLInputElement): Observable<Event> {
    const validateElements = [];
    validateElements.push(element);

    return fromEvent(element, 'input')
      .pipe(
        switchMap((event: InputEvent) =>
          element.getAttribute('data-validate') === 'phone' ?
          this.phoneValidate(event, element) : of(event)),
        filter(() => this.validator.validate(validateElements)),
      );
  }

  /**
   *
   * @param $event
   * @param {HTMLInputElement} element
   * @returns {Observable<InputEvent>}
   */
  private phoneValidate($event, element: HTMLInputElement) {
    return of($event).pipe(
      filter(() => element.value.length > 0),
      map((event: InputEvent) => {
        if (this.allowedPhoneSymbols.indexOf(element.value) === -1) {
          const valueArray = element.value.split('');
          const newArray = valueArray.filter(character => this.allowedPhoneSymbols.indexOf(character) > -1);
          element.value = newArray.join('');
        }
        return event;
      }),
    );
  }

  /**
   *
   * @param {string} url
   * @returns {string}
   */
  private buildUrl(url: string): string {
    return `${this.apiFormUrl}/${url}`;
  }

  /**
   *
   * @param {Form} data
   */
  private register(data: Form): Promise<Registration> {
    const url = this.buildUrl(`${data.landing}/addCustomer`);
    return this.appService.post(`${url}`, data)
      .then(response => response.success as Registration);
  }

  /**
   *
   * @param {Registration} data
   * @param {FormModel} form
   * @returns {Observable<Registration>}
   */
  private bookAction(data: Registration, form: FormModel): Observable<Registration> {
    this.bookSubject$.next(data);
    return this.bookSubject$.asObservable()
      .pipe(
        filter((response: Registration) => response.book),
        tap(() => {
          this.effects.showModal();
          this.effects.stopLoader();
        }),
        delay(5000),
        tap((response: Registration) => form.success(response.url)),
      );
  }

  /**
   *
   * @param {Registration} data
   * @param {FormModel} form
   */
  private defaultAction(data: Registration, form: FormModel): Observable<Registration> {
    this.bookSubject$.next(data);
    return this.bookSubject$.asObservable()
      .pipe(
        filter((response: Registration) => !response.book),
        tap((response: Registration) => form.success(response.url)),
      );
  }

  /**
   *
   * @param {Error} error
   * @param {FormModel} form
   */
  private handleError(error: Error, form: FormModel) {
    this.effects.stopLoader();
    if (this.errorComponent) {
      this.errorComponent.setActiveModel(form);

      this.errorComponent.showError(
        error || { message: 'Something wrong' }, error ? 'error' : 'critical',
      );
    }
    return of(false);
  }
}
