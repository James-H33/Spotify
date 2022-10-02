import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { fromEvent, Subject, takeUntil, tap } from 'rxjs';
import { Track } from 'src/app/services/api/models/track';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() public item?: Track = new Track();

  @ViewChild('CardImageWrapper')
  public set cardImageWrapper(el: any) {
    this._cardImageWrapper = el;

    console.log('CardImageWrapper Set: ', el);

    this.adjustCardHeight();
  }

  private _cardImageWrapper!: ElementRef;
  private isFirstRender = true;
  private destroy$ = new Subject<boolean>();

  public get image() {
    const images = this.item?.album?.images;

    return images && images.length > 0 ? images[0] : { url: '' };
  }

  constructor(
    @Inject('Window') private windowRef: Window
  ) { }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private adjustCardHeight() {
    if (this.isFirstRender) {
      this.watchForResize();
      this.isFirstRender = false;
    }

    const wrapper = this._cardImageWrapper.nativeElement;
    const width = wrapper.getBoundingClientRect().width;
    wrapper.style.height = `${width}px`;
  }

  private watchForResize() {
    fromEvent(this.windowRef, 'resize')
      .pipe(
        takeUntil(this.destroy$),
        tap(e => this.adjustCardHeight())
      ).subscribe();
  }
}
