export class DropdownModel {
  private dropDownValue: {[key: string]: string} = {};
  constructor(
    private item: HTMLElement,
  ) {
    this.dropDownValue = this.getValues();
  }
  /**
   *
   * @returns {HTMLElement}
   */
  public get element(): HTMLElement {
    return this.item;
  }

  /**
   *
   * @returns {string}
   */
  public get value(): string {
    return Object.values(this.dropDownValue).join('').toLowerCase();
  }

  /**
   *
   * @returns {[key: string]: string}
   */
  public get inputValue(): {[key: string]: string} {
    return this.dropDownValue;
  }

  /**
   *
   * @returns {string}
   */
  public get text(): string {
    return this.item.innerText.toLowerCase();
  }

  /**
   *
   * @returns {any}
   */
  public get inputText(): string {
    return this.item.dataset.text;
  }

  /**
   *
   * @returns {string}
   */
  public get html(): string {
    return this.item.innerHTML;
  }

  /**
   *
   */
  public show() {
    if (this.item.hasAttribute('style')) {
      this.item.removeAttribute('style');
    }
  }

  /**
   *
   */
  public hide() {
    if (!this.item.hasAttribute('style')) {
      this.item.style.display = 'none';
    }
  }

  /**
   *
   */
  private getValues(): {[key: string]: string} {
    try {
      return JSON.parse(this.item.dataset.value.toLowerCase());
    } catch (e) {
      console.error('Please check JSON params', this.item.dataset.value);
    }
    return {};
  }
}
