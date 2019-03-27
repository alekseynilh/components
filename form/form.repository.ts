import { FormModel } from './form.model';

export class FormRepository {
  private model: FormModel[] = [];
  constructor(private elements: HTMLFormElement[]) {
    this.elements.forEach(item => this.model.push(new FormModel(item)));
  }

  public get forms() {
    return this.model;
  }
}
