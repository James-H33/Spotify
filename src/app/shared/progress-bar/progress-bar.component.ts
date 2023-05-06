import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input()
  public min = 0;

  @Input()
  public max = 100;

  @Input()
  public value = 0;

  @Input()
  public step = 1;

  @Output()
  public change = new EventEmitter();

  constructor() { }

  public onChange(event: any) {
    this.change.emit(event);
  }
}
