import { Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { fromEvent, Subject, takeUntil, tap } from 'rxjs';
import { Track } from 'src/app/services/api/models/track';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() public item?: Track = new Track();
  @Output() public selected = new EventEmitter<{track:  Track, play: boolean}>();
  @Output() public stopPlaying = new EventEmitter();
  @Input() public isPlaying = false;

  @ViewChild('CardImageWrapper')
  public set cardImageWrapper(el: any) {
    this._cardImageWrapper = el;

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

  public onSelect() {
    this.selected.emit({ track: this.item as any, play: false });
  }

  public onSelectAndPlay({ event, play }: any) {
    event.stopPropagation();

    if (!play) {
      this.onStopPlaying();
      return;
    }

    this.selected.emit({ track: this.item as any, play });
  }

  public onStopPlaying() {
    this.stopPlaying.emit();
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
