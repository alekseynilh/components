import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

export class ErrorService {
  public clickError(element: HTMLElement): Observable<MouseEvent> {
    return fromEvent(element, 'click')
      .pipe(map((event: MouseEvent) => event));
  }
}
