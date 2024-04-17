import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string | Date, format: string = 'medium'): string {
    const date = new Date(value);
    let options: Intl.DateTimeFormatOptions = {};
    if (format === 'short') {
      options = { year: '2-digit', month: 'numeric', day: 'numeric' };
    } else if (format === 'medium') {
      options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    } else if (format === 'long') {
      options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    }
    return new Intl.DateTimeFormat('sr-RS', options).format(date);
  }
}
