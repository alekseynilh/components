import { FormService } from './form.service';
import { FormComponent } from './form.component';
import { FormRepository } from './form.repository';
import { AppService } from '../app.service';

export class FormModule {
  private service: FormService;
  private component: FormComponent;
  private repository: FormRepository;
  constructor(
    private forms: HTMLFormElement[],
    private appService: AppService,
  ) {
    this.service = new FormService(this.appService);
    this.repository = new FormRepository(this.forms);
    this.component = new FormComponent(this.service, this.repository);
  }

  public onInit() {
    this.component.onInit();
  }
}
