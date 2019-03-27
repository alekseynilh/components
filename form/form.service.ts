import { Form } from './form';
import { AppService } from '../app.service';
import { Observable, fromEvent, of } from 'rxjs';
import { catchError, filter, repeat, switchMap, takeWhile, tap } from 'rxjs/operators';
import { FormModel } from './form.model';
import { FormValidator } from './validator/form.validator';

export class FormService {
  readonly apiFormUrl = '/api';
  private validator: FormValidator;
  private isDone = false;
  constructor(
    private appService: AppService,
  ) {
    this.validator = new FormValidator();
  }

  /**
   *
   * @param {FormModel} form
   * @returns {Observable<MouseEvent>}
   */
  public formSubmit(form: FormModel): Observable<MouseEvent> {
    return fromEvent(form.form, 'submit')
      .pipe(
        takeWhile(() => !this.isDone),
        tap((event: MouseEvent) => event.preventDefault()),
        filter(() => this.validator.validate(form.checkElements)),
        switchMap(() => this.register(form.getData())),
        catchError(error => of(error)),
        repeat(),
      );
  }

  /**
   *
   * @param {HTMLElement} element
   * @returns {Observable<Event>}
   */
  public validateElement(element: HTMLElement): Observable<Event> {
    const validateElements = [];
    validateElements.push(element);
    return fromEvent(element, 'input')
      .pipe(
        filter(() => this.validator.validate(validateElements)),
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
  private register(data: Form) {
    const url = this.buildUrl(`${data.landing}/addCustomer`);
    return this.appService.post(`${url}`, data)
      .then(response => response);
  }
}
