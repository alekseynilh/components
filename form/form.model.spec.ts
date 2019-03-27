/// <reference path='../../../../../node_modules/@types/jasmine/index.d.ts' />
/// <reference path='../../../../../node_modules/@types/jasmine-fixture/index.d.ts' />
/// <reference path='../../../../..//node_modules/@types/karma-fixture/index.d.ts' />

import { AppService } from '../app.service';
import { FormModel } from './form.model';

describe('Form Model', () => {
  let Model: FormModel;
  const appService: AppService = new AppService();
  beforeEach(() => {
    const fixture = '<div id="fixture">' +
      '<form data-form="registration" novalidate data-type="onchange">' +
      '<input type="hidden" name="landing" value="fullreg">' +
      '<input type="password" name="password" data-validate="password" value="qweqwe123">' +
      '<input type="text" name="name" data-validate="text" value="test">' +
      '<input type="email" name="email" data-validate="email" value="test@test.com">' +
      '<input type="checkbox" name="terms" data-validate="checkbox" checked>' +
      '<input type="number" name="phone" data-validate="phone" value="292929292">' +
      '<button type="submit"></button>' +
      '</form>' +
      '</div>';

    document.body.insertAdjacentHTML('afterbegin', fixture);
    Model = new FormModel(document.body.querySelector('[data-form]'));
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture'));
  });

  it('must be return validate type', () => {
    expect(Model.type).toEqual('onchange');
  });

  it('get Validating elements', () => {
    expect(Model.checkElements).toEqual([].slice.call(document.querySelectorAll('[data-validate]')));
  });

  it('get form data', () => {
    expect(Model.getData()).toEqual({
      landing: 'fullreg',
      password: 'qweqwe123',
      name: 'test',
      email: 'test@test.com',
      terms: 'on',
      phone: '292929292',
    });
  });
});
