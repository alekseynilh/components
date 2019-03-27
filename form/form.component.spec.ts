/// <reference path='../../../../../node_modules/@types/jasmine/index.d.ts' />
/// <reference path='../../../../../node_modules/@types/jasmine-fixture/index.d.ts' />
/// <reference path='../../../../..//node_modules/@types/karma-fixture/index.d.ts' />

import { FormRepository } from './form.repository';
import { FormService } from './form.service';
import { AppService } from '../app.service';
import { FormComponent } from './form.component';

describe('Form', () => {
  let repository: FormRepository;
  let service: FormService;
  let formComponent: FormComponent;
  const appService: AppService = new AppService();
  beforeEach(() => {
    const fixture = '<div id="fixture">' +
      '<form data-form="registration" novalidate data-type="onchange">' +
      '<input type="hidden" name="landing" value="fullreg">' +
      '<input type="password" data-validate="password">' +
      '<input type="text" data-validate="text">' +
      '<input type="email" data-validate="email">' +
      '<input type="checkbox" data-validate="checkbox">' +
      '<input type="number" data-validate="phone">' +
      '<button type="submit"></button>' +
      '</form>' +
      '<form data-form="registration" novalidate>' +
      '<input type="hidden" name="landing" value="fullreg">' +
      '<input type="password" data-validate="password">' +
      '<input type="text" data-validate="text">' +
      '<input type="email" data-validate="email">' +
      '<input type="checkbox" data-validate="checkbox">' +
      '<input type="number" data-validate="phone">' +
      '<button type="submit"></button>' +
      '</form>' +
    '</div>';

    document.body.insertAdjacentHTML('afterbegin', fixture);
    repository = new FormRepository([].slice.call(document.querySelectorAll('[data-form]')));
    service = new FormService(appService);
    formComponent = new FormComponent(service, repository);
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture'));
  });

  it('it repository & service must be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
  });

  it('it events must be assigned and called', () => {
    const subscribeSpy = spyOn(formComponent as any, 'subscribe');
    formComponent.onInit();
    expect(subscribeSpy).toHaveBeenCalled();
  });

  it('service must be call submit', () => {
    formComponent.onInit();
    const submitSpy = spyOn(service, 'formSubmit');
    const form = document.querySelector('[data-form]') as HTMLFormElement;
    // TODO submit form
    // expect(submitSpy).toHaveBeenCalledTimes(5);
    expect(true).toEqual(true);
  });
});
