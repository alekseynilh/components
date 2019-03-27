
import { FormModule } from './form/form.module';
import { HelpersComponent } from './helpers/helpers.component';
import { AppService } from './app.service';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ButtonsDirective } from './buttons/buttons.directive';

export class App {
  private forms: FormModule;
  private helper: HelpersComponent;
  private service: AppService;
  private dropdowns: HTMLElement[];
  constructor() {
    this.service = new AppService();
    this.forms =
      new FormModule(
        [].slice.call(document.querySelectorAll('[data-form]')), this.service,
      );
    this.helper = new HelpersComponent();
    this.dropdowns = [].slice.call(document.querySelectorAll('[data-dropdown="section"]'));
  }

  public onInit() {
    this.forms.onInit();
    this.dropdowns.forEach(item => new DropdownComponent(item).onInit());
    new ButtonsDirective().onInit();
  }
}
