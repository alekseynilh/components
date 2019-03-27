import { Form } from './form';
import { AppService } from '../app.service';
import { Observable, fromEvent, of } from 'rxjs';
import { catchError, filter, repeat, switchMap, tap } from 'rxjs/operators';
import { FormModel } from './form.model';
import { FormValidator } from './validator/form.validator';
import { Error } from '../helpers/models/Error';
import { ErrorComponent } from '../helpers/error.component';

export class FormService {
  readonly apiFormUrl = '/api';
  private validator: FormValidator;
  private errorComponent: ErrorComponent;
  constructor(
    private appService: AppService,
  ) {
    this.validator = new FormValidator();
    const errorSection = document.querySelector('[data-modal="error"]') as HTMLElement;
    if (errorSection) {
      this.errorComponent = new ErrorComponent(errorSection);
    }
  }

  /**
   *
   * @param {FormModel} form
   * @returns {Observable<MouseEvent>}
   */
  public formSubmit(form: FormModel): Observable<MouseEvent> {
    return fromEvent(form.form, 'submit')
      .pipe(
        tap((event: MouseEvent) => event.preventDefault()),
        filter(() => this.validator.validate(form.checkElements)),
        switchMap(() => this.register(form.getData())),
        catchError(error => this.handleError(error.error as Error, form)),
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

  private handleError(error: Error, form: FormModel) {
    if (this.errorComponent) {
      this.errorComponent.setActiveModel(form);
      this.errorComponent.showError(error);
    }
    return of(false);
  }
}
