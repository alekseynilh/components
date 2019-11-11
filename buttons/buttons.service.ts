import { fromEvent, combineLatest, merge, Observable } from 'rxjs';
import { combineAll, filter, map, tap  } from 'rxjs/operators';

export class ButtonsService {
  public buttonEvent(button: HTMLElement) {
    return fromEvent(button, 'click')
      .pipe(
        tap((event: MouseEvent) => event.preventDefault()),
      );
  }

  public documentEventsToggler(element: HTMLElement): Observable<boolean> {
    const documentClick =  fromEvent(document, 'click')
      .pipe(
        map((event: MouseEvent) => element.contains(<HTMLElement>event.target) || element === event.target),
      );
    const documentKeys = fromEvent(document, 'keydown')
      .pipe(
        filter((event: KeyboardEvent) => event.code === 'Escape'),
        map(() => false),
      );
    return merge(documentKeys, documentClick);
  }
}
