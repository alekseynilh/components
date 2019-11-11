import { DropdownModel } from './dropdown.model';

export class DropdownRepository {
  private models: DropdownModel[] = [];
  private textHolder: HTMLElement;
  private activeModel: DropdownModel;
  constructor(
    private container: HTMLElement,
  ) {
    this.textHolder = this.container.querySelector('[data-dropdown="text-holder"]');
    [].slice
      .call(this.container.querySelectorAll(`[data-dropdown="value"]`))
      .forEach(item => this.models.push(new DropdownModel(item)));
  }

  public set active(model: DropdownModel) {
    this.activeModel = model;
  }

  public get active(): DropdownModel {
    return this.activeModel;
  }

  /**
   *
   * @returns {DropdownModel[]}
   */
  public get items(): DropdownModel[] {
    return this.models;
  }

  /**
   *
   * @param {string} value
   */
  public find(value: string): DropdownModel[] {
    return this.models.filter((item: DropdownModel) => {
      const valueArray = value.replace(/\s+/g, '').split('');
      return Object.keys(item.inputValue).filter((key: string) => {
        const keysArray = item.inputValue[key].split('');
        return valueArray.every((current, i) => current === keysArray[i]);
      }).length > 0;
    });
  }

  /**
   *
   * @param {DropdownModel[]} models
   */
  public show(models: DropdownModel[]): void {
    this.models
      .filter(item => models.find(suggest => item === suggest) ?
        this.showElement(item) : this.hideElement(item));
  }

  /**
   *
   * @param {DropdownModel} model
   */
  public showElement(model: DropdownModel): void {
    model.show();
  }

  /**
   *
   * @param {DropdownModel} model
   */
  public hideElement(model: DropdownModel): void {
    model.hide();
  }

  /**
   *
   */
  public setValue(): void {
    this.textHolder.innerText = this.active.inputText;
    this.setInputData();
  }

  /**
   *
   */
  private setInputData(): void {
    Object.keys(this.active.inputValue).forEach((key: string) => {
      try {
        const inputElement = <HTMLInputElement>this.container.querySelector(`[name="${key}"]`);
        inputElement.value = this.active.inputValue[key];
      } catch (e) {
        console.error('Check input element, is exist?', `Element: <input name="${key}">`);
      }
    });
  }
}
