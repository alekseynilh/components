import { Validate } from './validate';

export class FormValidator {
  readonly errorClass = 'input--error';
  readonly validation: Validate = {
    text: ((item: HTMLFormElement) => /([^\s*$])/.test(item.value)),
    phone: ((item: HTMLInputElement) => {
      const regExp = /^[\d.\-\(\)\+\ /]{6,20}$/.test(item.value);
      const minNumbers = item.value.replace(/[^0-9]/g, '');
      return regExp && minNumbers.length > 5;
    }),
    /* tslint:disable:max-line-length */
    email: ((item: HTMLFormElement) => /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(item.value)),
    /* tslint:enable:max-line-length */
    password: ((item: HTMLFormElement) =>  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,15}/i.test(item.value)),
    checkbox: ((item: HTMLFormElement) => item.checked),
  };
  private state = true;

  /**
   *
   * @param {HTMLFormElement[]} elements
   * @returns {boolean}
   */
  public validate(elements: HTMLFormElement[]): boolean {
    this.state = true;
    for (const item of elements) {
      const validateField = item.dataset.validate;
      const result = this.validation[validateField](item, this);
      if (!result) {
        item.classList.add(this.errorClass);
        item.parentElement.classList.add(this.errorClass);
        this.state = false;
      } else {
        item.classList.remove(this.errorClass);
        item.parentElement.classList.remove(this.errorClass);
      }
    }
    return this.state;
  }
}
