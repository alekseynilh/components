/// <reference path='../../../../../../node_modules/@types/jasmine/index.d.ts' />
/// <reference path='../../../../../../node_modules/@types/jasmine-fixture/index.d.ts' />
/// <reference path='../../../../../..//node_modules/@types/karma-fixture/index.d.ts' />

import { FormValidator } from './form.validator';

describe('Form Validator', () => {
  const Validator = new FormValidator();
  beforeEach(() => {
    const fixture = '<div id="fixture">' +
      '<form data-form="registration" novalidate data-type="onchange">' +
      '<input type="hidden" name="landing" value="fullreg">' +
      '<input type="password" name="password" data-validate="password" value="qweqwe123">' +
      '<input type="text" name="name" data-validate="text" value="test">' +
      '<input type="email" name="email" data-validate="email" value="test@test.com">' +
      '<input type="email" name="email" data-validate="email" value="тест@тест.рф">' +
      '<input type="email" name="email" data-validate="email" value="سыياسة@mail.com">' +
      '<input type="checkbox" name="terms" data-validate="checkbox" checked>' +
      '<input type="number" name="phone" data-validate="phone" value="292929292">' +
      '<button type="submit"></button>' +
      '</form>' +
      '</div>';

    document.body.insertAdjacentHTML('afterbegin', fixture);
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture'));
  });

  it('must be correct email', () => {
    const emails = [].slice.call(document.querySelectorAll('[data-validate="email"]'));
    expect(Validator.validate(emails)).toBeTruthy();
  });

  it('must be correct phone', () => {
    const phone = [].slice.call(document.querySelectorAll('[data-validate="phone"]'));
    expect(Validator.validate(phone)).toBeTruthy();
  });

  it('must be incorrect phone', () => {
    const phone = [].slice.call(document.querySelectorAll('[data-validate="phone"]'));
    phone.forEach(item => item.value = '2929292+92');
    expect(Validator.validate(phone)).toBeFalsy();
  });

  it('must be correct password', () => {
    const password = [].slice.call(document.querySelectorAll('[data-validate="password"]'));
    expect(Validator.validate(password)).toBeTruthy();
  });

  it('must be correct checkbox', () => {
    const checkbox = [].slice.call(document.querySelectorAll('[data-validate="checkbox"]'));
    expect(Validator.validate(checkbox)).toBeTruthy();
  });

  it('must be correct text', () => {
    const text = [].slice.call(document.querySelectorAll('[data-validate="text"]'));
    expect(Validator.validate(text)).toBeTruthy();
  });

});
