import { ButtonsService } from './buttons.service';
import { Subscription } from 'rxjs/index';

export class ButtonsDirective {
  private service: ButtonsService;
  private eventSubscription: Subscription[] = [];
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
}
