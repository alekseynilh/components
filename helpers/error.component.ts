import { Error } from './models/Error';
import { FormModel } from '../form/form.model';
import { ErrorService } from './error.service';
import { Subscription } from 'rxjs/index';

export class ErrorComponent {
  private service: ErrorService;
  private errorText: HTMLElement;
  private errorClose: HTMLElement;
  private eventSubscription: Subscription;
  private form: FormModel;
  constructor(
    private errorBlock: HTMLElement,
  ) {
    this.service = new ErrorService();
    this.errorText = this.errorBlock.querySelector('[data-modal="text"]');
    this.errorClose = this.errorBlock.querySelector('[data-modal="close"]');
  }

  /**
   *
   * @param {Error} error
   */
  public showError(error: Error) {
    this.form.setError();

    if (this.eventSubscription) {
      this.destroyEvents();
    }
    if (this.errorBlock) {
      this.errorText.innerHTML = error.message || error.msg;
      this.assignEvents();
    }
  }

  public hideError() {
    this.form.hideError();
    this.destroyEvents();
  }

  /**
   *
   * @param {FormModel} form
   */
  public setActiveModel(form: FormModel) {
    this.form = form;
  }

  /**
   *
   */
  private assignEvents(): void {
    this.eventSubscription = this.service.clickError(this.errorClose).subscribe(() => this.hideError());
  }

  /**
   *
   */
  private destroyEvents() {
    this.eventSubscription.unsubscribe();
  }
}
