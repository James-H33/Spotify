import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent {
  @Output() public clicked = new EventEmitter();
  @Input() set isPlaying(v: boolean | null) {
    this._isPlaying = v || false;
  }

  public get isPlaying() {
    return this._isPlaying;
  }

  private _isPlaying = false;

  public trigger() {
    this.clicked.emit(!this.isPlaying);
  }
}

