/// <reference path='../../../../../node_modules/@types/jasmine/index.d.ts' />
/// <reference path='../../../../../node_modules/@types/jasmine-fixture/index.d.ts' />
/// <reference path='../../../../..//node_modules/@types/karma-fixture/index.d.ts' />

import { DropdownModel } from './dropdown.model';

describe('Dropdown Model', () => {
  let model: DropdownModel;
  beforeEach(() => {
    const fixture = '<div id="fixture">' +
      '<div  data-dropdown="value" data-text="+ 375" data-value=\'{"country": "BY", "phone_prefix": "+375"}\'>QWEqwe</div>'+
      '</div>';
    document.body.insertAdjacentHTML('afterbegin', fixture);
    model = new DropdownModel(document.querySelector('[data-dropdown="value"]'));
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture'));
  });

  it('get value must be string', () => {
    expect(model.value).toEqual('by+375');
  });

  it('element must return HTMLElement', () => {
    expect(model.element.tagName).toEqual('DIV');
  });

  it('inputValue must be Object', () => {
    expect(model.inputValue).toEqual({
      country: 'by',
      phone_prefix: '+375',
    });
  });

  it('inner test must be lowerCase', () => {
    expect(model.text).toEqual('qweqwe');
  });

  it('inpuText must be equal data-text attribute', () => {
    const divElement = document.querySelector('[data-dropdown="value"]') as HTMLElement;
    expect(model.inputText).toEqual(divElement.dataset.text);
  });

  it('html must be return ALL HTML div', () => {
    const divElement = document.querySelector('[data-dropdown="value"]') as HTMLElement;
    expect(model.html).toEqual(divElement.innerHTML);
  });

  it('element should not contain style attribute', () => {
    const divElement = document.querySelector('[data-dropdown="value"]') as HTMLElement;
    model.hide();
    expect(divElement.getAttribute('style')).toBeTruthy();
    model.show();
    expect(divElement.getAttribute('style')).toBeFalsy();
  });

  it('element must contain style  display:none attribute', () => {
    const divElement = document.querySelector('[data-dropdown="value"]') as HTMLElement;
    model.show();
    expect(divElement.getAttribute('style')).toBeFalsy();
    model.hide();
    expect(divElement.getAttribute('style')).toBeTruthy();
    model.hide();
    expect(divElement.getAttribute('style')).toBeTruthy();
    expect(divElement.style.display === 'none').toBeTruthy();
  });
});
