import { Component, EventEmitter, Input, Output } from '@angular/core';

export enum PlayButtonStyles {
  Primary = 'primary',
  Secondary = 'secondary',
}

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent {
  @Output() public clicked = new EventEmitter<{event: MouseEvent, play: boolean}>();
  @Input() public styleType = PlayButtonStyles.Primary;
  @Input() set isPlaying(v: boolean | null) {
    this._isPlaying = v || false;
  }

  public get isPlaying() {
    return this._isPlaying;
  }

  private _isPlaying = false;

  public trigger(e: MouseEvent) {
    e.stopPropagation();
    this.clicked.emit({ event: e, play: !this.isPlaying });
  }
}

