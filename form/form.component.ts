import { FormService } from './form.service';
import { FormRepository } from './form.repository';
import { FormModel } from './form.model';
import { Subscription } from 'rxjs';

export class FormComponent {
  private eventSubscription: Subscription[] = [];
  constructor(
    private service: FormService,
    private repository: FormRepository,
  ) {}

  public onInit() {
    this.events();
  }

  private events() {
    this.subscribe();
  }

  private subscribe() {
    this.repository.forms.forEach((item: FormModel) => {
      this.eventSubscription.push(this.service.formSubmit(item).subscribe());
      if ('onchange' === item.type) {
        item.checkElements.forEach((element: HTMLElement) =>
          this.service.validateElement(element).subscribe());
      }
    });
  }
}
