import { fromEvent, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export class DropdownService {
  private allowed = false;
  constructor() {}
  /**
   *
   */
  public allowDocumentClick(): void {
    this.allowed = true;
  }

  /**
   *
   */
  public disableDocumentClick(): void {
    this.allowed = false;
  }

  /**
   *
   * @param {HTMLInputElement} element
   * @returns {Observable<string>}
   */
  public input(element: HTMLInputElement): Observable<string> {
    return fromEvent(element, 'input')
      .pipe(
        filter(() => this.allowed),
        map((event: KeyboardEvent) =>
          (event.target as HTMLInputElement).value.replace('+', '').toLowerCase(),
        ),
      );
  }

  /**
   *
   * @param {HTMLElement} element
   * @returns {Observable<MouseEvent>}
   */
  public holderClick(element: HTMLElement): Observable<void> {
    return fromEvent(element, 'click')
      .pipe(
        map((event: MouseEvent) => event.preventDefault()),
      );
  }

  /**
   *
   * @param {HTMLInputElement} element
   * @returns {Observable<KeyboardEvent>}
   */
  public keyPress(element: HTMLInputElement) {
    return fromEvent(element, 'keypress')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'Enter'),
        map((event: KeyboardEvent) => {
          event.preventDefault();
          event.stopImmediatePropagation();
          return (event.target as HTMLInputElement).value.toLowerCase();
        }),
      );
  }

  /**
   *
   * @param {HTMLElement} element
   * @returns {Observable<MouseEvent>}
   */
  public selectByClick(element: HTMLElement): Observable<MouseEvent> {
    return fromEvent(element, 'click')
      .pipe(filter((event: MouseEvent) => this.allowed));
  }
  /**
   *
   * @param {string} documentEvent
   * @param {HTMLElement} container
   * @returns {Observable<MouseEvent>}
   */
  public assignDocumentClick(documentEvent: string, container: HTMLElement): Observable<MouseEvent | KeyboardEvent> {
    return fromEvent(document, documentEvent)
      .pipe(
        filter(() => this.allowed),
        filter((event: MouseEvent | KeyboardEvent) =>
          event instanceof KeyboardEvent ? event.code === 'Escape' : !container.contains(<Node>event.target),
        ),
      );
  }
}
