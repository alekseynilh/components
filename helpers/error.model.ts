export class ErrorModel {
  readonly errorClass = 'error-active';
  public errorClose: HTMLElement;
  private errorText: HTMLElement;
  constructor(
    private container: HTMLElement,
    public type: string,
  ) {
    this.errorText = this.container.querySelector('[data-modal="text"]');
    this.errorClose = this.container.querySelector('[data-modal="close"]');
  }

  public setText(text: string) {
    this.errorText.innerHTML = text;
  }

  public showError() {
    this.container.classList.add(this.errorClass);
  }

  public hideError() {
    this.container.classList.remove(this.errorClass);
  }
}
