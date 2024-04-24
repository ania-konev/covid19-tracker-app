import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dotNumber',
})
export class DotNumberPipe implements PipeTransform {
  transform(value: number): string {
    const stringValue = value.toString();

    const reversedGroups = stringValue
      .split('')
      .reverse()
      .join('')
      .match(/\d{1,3}/g);

    return reversedGroups
      ? reversedGroups.join(' ').split('').reverse().join('')
      : '';
  }
}
