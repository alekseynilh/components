import { Form } from './form';
import { Error } from '../helpers/models/Error';

export class FormModel {
  readonly errorClass = 'form-error';
  private elements: HTMLFormElement[];
  private validateElements: HTMLFormElement[];
  private validationType: string;
  constructor(
    public form: HTMLFormElement,
  ) {
    this.elements = [].slice.call(this.form.querySelectorAll('input, select, textarea'));
    this.validateElements = [].slice.call(this.form.querySelectorAll('[data-validate]'));
    this.validationType = this.form.getAttribute('data-type') || 'default';
  }

  /**
   *
   * @param {boolean} onlyVisible
   * @returns {Form}
   */
  public getData(): Form {
    const data = {};
    for (const item of this.elements) {
      const itemName = item.getAttribute('name');
      if (itemName) {
        switch (item.type) {
          case 'checkbox':
            if (item.checked) {
              data[`${itemName}`] = item.value;
            }
            break;
          default:
            data[`${itemName}`] = item.value;
        }
      }
    }
    return data;
  }

  /**
   *
   * @returns {string}
   */
  public get type(): string {
    return this.validationType;
  }

  /**
   *
   * @returns {HTMLFormElement[]}
   */
  public get checkElements(): HTMLFormElement[] {
    return this.validateElements;
  }

  /**
   *
   * @param {Error} error
   */
  public setError(error: Error): void {
    this.form.classList.add(this.errorClass);
  }

  /**
   *
   */
  public hideError() {
    this.form.classList.remove(this.errorClass);
  }
}
