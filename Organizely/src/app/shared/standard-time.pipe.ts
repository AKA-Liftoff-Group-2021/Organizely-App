import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'standardTime',
})
export class StandardTimePipe implements PipeTransform {
  transform(value: string): any {
    const standardTime = (value) => {
      return new Date('1955-11-05T' + value + 'Z').toLocaleTimeString(
        'bestfit',
        {
          timeZone: 'UTC',
          hour12: !0,
          hour: 'numeric',
          minute: 'numeric',
        }
      );
    };

    return standardTime(value);
  }
}
