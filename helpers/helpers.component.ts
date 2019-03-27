export class HelpersComponent {
  constructor() {

  }

  public isTouch(): boolean {
    return 'ontouchstart' in document.documentElement === true;
  }
}
