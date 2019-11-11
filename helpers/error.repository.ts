import { ErrorModel } from './error.model';

export class ErrorRepository {
  private models: ErrorModel[] = [];
  private activeModel: ErrorModel;
  constructor(
    private elements: { [key: string]: HTMLElement },
  ) {
    Object.keys(this.elements).forEach(key => this.models = [...this.models, new ErrorModel(this.elements[key], key)]);
  }

  public setErrorText(text: string) {
    this.activeModel.setText(text);
  }

  public setActiveModel(type: string) {
    this.activeModel = this.models.find(model => type === model.type);
  }

  public hideError() {
    this.activeModel.hideError();
  }

  public showError() {
    this.activeModel.showError();
  }

  /**
   *
   * @returns {HTMLElement}
   */
  public getCloseElement(): HTMLElement {
    return this.activeModel.errorClose;
  }
}
