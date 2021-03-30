import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayString',
})
export class DayStringPipe implements PipeTransform {
  transform(value: string): string {
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

    return weekdays[Number(value)];
  }
}
