/// <reference path='../../../../../node_modules/@types/jasmine/index.d.ts' />
/// <reference path='../../../../../node_modules/@types/jasmine-fixture/index.d.ts' />
/// <reference path='../../../../..//node_modules/@types/karma-fixture/index.d.ts' />

import { ButtonsService } from './buttons.service';
import { ButtonsDirective } from './buttons.directive';

describe('Buton directive', () => {
  const service: ButtonsService = new ButtonsService();
  let directive: ButtonsDirective;
  beforeEach(() => {
    const fixture = '<div id="fixture"><input type="password" name="password"><div data-button="password"></div></div>';
    document.body.insertAdjacentHTML('afterbegin', fixture);
    directive = new ButtonsDirective();
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture'));
  });

  it('call events', () => {
    const eventsSpy = spyOn(directive as any, 'events');
    directive.onInit();
    expect(eventsSpy).toHaveBeenCalledTimes(1);
  });

  it('must be call action', () => {
    const actionSpy = spyOn(directive as any, 'callAction');
    directive.onInit();
    const button = document.querySelector('[data-button]') as HTMLElement;
    button.click();
    expect(actionSpy).toHaveBeenCalledTimes(1);
  });

  it('must be call password action', () => {
    const actionSpy = spyOn(directive as any, 'password').and.callThrough();
    directive.onInit();
    const button = document.querySelector('[data-button]') as HTMLElement;
    const inputelement = document.querySelector('input') as HTMLInputElement;
    button.click();
    button.click();
    expect(actionSpy).toHaveBeenCalledTimes(2);
    expect(inputelement.getAttribute('type')).toEqual('password');
  });
});
