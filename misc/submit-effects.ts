export class SubmitEffects {
  constructor(
    private container?: HTMLElement,
    private loaderClass?: string,
    private modalClass?: string,
  ) {
    this.container = this.container || document.body;
    this.loaderClass = this.loaderClass || 'loading-start';
    this.modalClass = this.modalClass || 'modal-show';
  }

  public startLoader(): void {
    this.container.classList.add(this.loaderClass);
  }

  public stopLoader(): void {
    this.container.classList.remove(this.loaderClass);
  }

  public showModal(): void {
    this.container.classList.add(this.modalClass);
  }

  public hideModal(): void {
    this.container.classList.remove(this.modalClass);
  }
}
