/// <reference path='../../../../../node_modules/@types/jasmine/index.d.ts' />
/// <reference path='../../../../../node_modules/@types/jasmine-fixture/index.d.ts' />
/// <reference path='../../../../..//node_modules/@types/karma-fixture/index.d.ts' />

import { FormRepository } from './form.repository';
import { FormService } from './form.service';
import { AppService } from '../app.service';
import { FormModel } from './form.model';

describe('Form service', () => {
  let repository: FormRepository;
  let service: FormService;
  let Model: FormModel;
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
    const form = [].slice.call(document.querySelector('[data-form]'));
    Model = new FormModel(form);
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture'));
  });
});
