import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthYear',
})
export class MonthYearPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value; // If no value provided, return it as is

    const date = new Date(value);
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding '0' and slicing to ensure two digits
    const year = date.getFullYear().toString().slice(-2); // Getting last two digits of the year
    return `${month}/${year}`;
  }
}
