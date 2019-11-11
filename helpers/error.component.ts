import { Error } from './models/Error';
import { FormModel } from '../form/form.model';
import { ErrorService } from './error.service';
import { Subscription } from 'rxjs/index';
import { ErrorRepository } from './error.repository';

export class ErrorComponent {
  private service: ErrorService;
  private eventSubscription: Subscription;
  private form: FormModel;
  private errorBlocks: {
    [key: string]: HTMLElement,
  };
  private repository: ErrorRepository;
  constructor(
  ) {
    this.errorBlocks = {
      error: document.querySelector('[data-modal="error"]'),
      critical: document.querySelector('[data-modal="critical"]'),
    };

    this.service = new ErrorService();
    this.repository = new ErrorRepository(this.errorBlocks);
  }

  /**
   *
   * @param {Error} error
   * @param {string} type
   */
  public showError(error: Error, type: string = 'error') {

    if (this.eventSubscription) {
      this.destroyEvents();
    }

    this.repository.setActiveModel(type);
    this.repository.setErrorText(error.message || error.msg);
    this.repository.showError();

    this.assignEvents();
  }

  public hideError() {
    this.repository.hideError();
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
    this.eventSubscription =
      this.service.clickError(this.repository.getCloseElement()).subscribe(() => this.hideError());
  }

  /**
   *
   */
  private destroyEvents() {
    this.eventSubscription.unsubscribe();
  }
}
