import { ButtonsService } from './buttons.service';
import { Subscription } from 'rxjs/index';

export class ButtonsDirective {
  readonly noticeClass = 'show-notice';
  private service: ButtonsService;
  private eventSubscription: Subscription[] = [];
  private noticeSubscription: Subscription;
  private buttons: HTMLElement[];
  constructor() {
    this.service = new ButtonsService();
    this.buttons = [].slice.call(document.querySelectorAll('[data-button]'));
  }

  public onInit() {
    this.events();
  }

  private events() {
    this.buttons.forEach(button => this.eventSubscription.push(
      this.service.buttonEvent(button).subscribe(() => this.callAction(button))),
    );
  }

  /**
   *
   * @param {HTMLElement} button
   */
  private callAction(button: HTMLElement) {
    const action = button.dataset.button;
    try {
      this[action].call(this, button);
    } catch (e) {
      console.error('Recheck button action is exist? action:', action);
    }
  }

  /**
   *
   * @param {HTMLElement} button
   */
  private password(button: HTMLElement): void {
    const element = button.parentElement.querySelector('input');
    const type = element.getAttribute('type') === 'password' ? 'text' : 'password';
    element.setAttribute('type', type);
  }

  /**
   *
   * @param {HTMLElement} button
   */
  private email(button: HTMLElement): void {
    const element = <HTMLElement>button.parentElement.querySelector('[data-email-notice]');

    if (this.noticeSubscription) {
      this.noticeSubscription.unsubscribe();
    }

    this.noticeSubscription = this.service.documentEventsToggler(button)
      .subscribe(result => this.toggleNotice(element, result));
  }

  private toggleNotice(element: HTMLElement, result: boolean) {
    const elementIsActive = element.classList.contains(this.noticeClass);
    result && !elementIsActive ? this.showNotice(element) : this.hideNotice(element);
  }

  private showNotice(element: HTMLElement) {
    element.classList.add(this.noticeClass);
  }

  private hideNotice(element: HTMLElement) {
    element.classList.remove(this.noticeClass);
    this.noticeSubscription.unsubscribe();
  }
}
