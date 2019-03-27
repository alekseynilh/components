import { DropdownRepository } from './dropdown.repository';
import { DropdownService } from './dropdown.service';
import { DropdownModel } from './dropdown.model';
import { Subscription } from 'rxjs';

export class DropdownComponent {
  readonly showClass = 'list-show';
  private repository: DropdownRepository;
  private searchInput: HTMLInputElement;
  private clickEvent: string;
  private holder: HTMLElement;
  private service: DropdownService;
  private eventSubscription: Subscription[] = [];

  constructor(private container: HTMLElement) {
    this.repository = new DropdownRepository(this.container);
    this.searchInput = this.container.querySelector('[data-dropdown="search"]');
    this.holder = this.container.querySelector('[data-dropdown="holder"]');
    this.service = new DropdownService();
    this.clickEvent = this.getClickEvents();
  }

  public onInit() {
    this.events();
  }

  /**
   *
   */
  public showList(): void {
    this.container.classList.add(this.showClass);
    if (this.searchInput) {
      this.searchInput.focus();
    }

    this.subscribe();
  }

  public hideList() {
    this.container.classList.remove(this.showClass);
    this.unsubscribe();
  }

  /**
   *
   * @returns {string}
   */
  public getClickEvents(): string {
    return 'ontouchstart' in document.documentElement === true ? 'touchstart' : 'click';
  }

  /**
   *
   */
  public toggleSection(): void {
    this.container.classList.contains(this.showClass) ? this.hideList() : this.showList();
  }

  /**
   *
   * @param {DropdownModel} element
   */
  public selectElement(element?: DropdownModel): void {
    if (element) {
      this.repository.active = element;
      this.repository.setValue();
      this.hideList();
    }
  }

  /**
   *
   */
  private events() {
    this.service.holderClick(this.holder).subscribe(() => this.toggleSection());
  }

  /**
   *
   */
  private subscribe(): void {
    this.service.allowDocumentClick();

    this.eventSubscription
      .push(this.service.assignDocumentClick(this.clickEvent, this.container).subscribe(() => this.hideList()));

    this.eventSubscription
      .push(this.service.assignDocumentClick('keydown', this.container).subscribe(() => this.hideList()));

    this.repository.items
      .forEach((item: DropdownModel) =>
        this.eventSubscription.push(
          this.service.selectByClick(item.element).subscribe(() => this.selectElement(item))),
      );

    if (this.searchInput) {
      this.searchEvents();
    }
  }

  /**
   *
   */
  private searchEvents(): void {
    this.eventSubscription.push(
      this.service
        .input(this.searchInput)
        .subscribe(result => this.repository.show(this.repository.find(result))),
    );

    this.eventSubscription.push(
      this.service
        .keyPress(this.searchInput)
        .subscribe(result => this.selectElement(this.repository.find(result)[0])),
    );
  }

  /**
   *
   */
  private unsubscribe(): void {
    this.service.disableDocumentClick();
    this.eventSubscription.forEach(item => item.unsubscribe());
  }
}
