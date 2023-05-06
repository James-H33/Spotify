import { Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { fromEvent, Subject, takeUntil, tap } from 'rxjs';
import { PlayableEntity, PlayableEntityDefaultStrategy, PlayableEntityType } from 'src/app/services/api/models/playable-entity';
import { Track } from 'src/app/services/api/models/track';

@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.scss']
})
export class TrackCardComponent {
  @Input() public entityStrategy = PlayableEntityDefaultStrategy;
  @Input() public item?: PlayableEntity = new PlayableEntity();
  @Output() public selected = new EventEmitter<{item: PlayableEntity, play: boolean}>();
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
    const Strategy = this.entityStrategy;

    return new Strategy(this.item).firstImage;
  }

  constructor(
    @Inject('Window') private windowRef: Window
  ) { }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onSelect() {
    this.selected.emit({ item: this.item as any, play: false });
  }

  public onSelectAndPlay({ event, play }: any) {
    event.stopPropagation();

    this.selected.emit({ item: this.item as any, play });
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
