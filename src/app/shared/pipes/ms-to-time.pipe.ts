import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToTime'
})
export class MsToTimePipe implements PipeTransform {
  public transform(value: any, args?: any): any {
    return this.msToTime(value);
  }

  private msToTime(s: number) {
    const ms = s % 1000;
    s = (s - ms) / 1000;

    let secs: any = s % 60;
    s = (s - secs) / 60;

    let mins: any = s % 60;
    const hrs = (s - mins) / 60;

    let time: any;

    if (secs < 10) {
      secs = '0' + secs;
    }

    time = secs;

    if (mins < 10 && hrs > 0) {
      mins = '0' + mins;
    }

    time = mins + ':' + time;

    if (hrs > 0) {
      time = hrs + ':' + time;
    }

    return time;
  }
}
