import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayString',
})
export class DayStringPipe implements PipeTransform {
  transform(value: number): string {
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    return weekdays[value];
  }
}
