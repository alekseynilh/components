import { Form } from './form';

export class FormModel {
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
   * @param {string} url
   * @returns {string}
   */
  public success(url: string): string {
    return window.location.href = url;
  }
}
