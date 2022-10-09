import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
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

  ngOnInit() {
  }

  public onChange(event: any) {
    this.change.emit(event);
  }
}
