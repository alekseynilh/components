import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';

export class ButtonsService {
  public buttonEvent(button: HTMLElement) {
    return fromEvent(button, 'click')
      .pipe(
        tap((event: MouseEvent) => event.preventDefault()),
      );
  }
}
