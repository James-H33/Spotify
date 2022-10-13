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

    const secs = s % 60;
    s = (s - secs) / 60;

    const mins = s % 60;
    const hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs;
  }
}
