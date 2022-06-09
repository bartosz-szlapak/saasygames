import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArray',
})
export class ToArrayPipe implements PipeTransform {
  transform(value: any): any[] {
    if (value instanceof Array) {
      return value;
    }

    return [value];
  }
}
