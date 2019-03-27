/// <reference path='../../../../../node_modules/@types/jasmine/index.d.ts' />
/// <reference path='../../../../../node_modules/@types/jasmine-fixture/index.d.ts' />
/// <reference path='../../../../..//node_modules/@types/karma-fixture/index.d.ts' />

describe('Dropdown Service', () => {
  beforeEach(() => {
    const fixture = '<div id="fixture"></div>';
    document.body.insertAdjacentHTML('afterbegin', fixture);
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture'));
  });

});
