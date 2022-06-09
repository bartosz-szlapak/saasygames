import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pageNumber',
})
export class PageNumberPipe implements PipeTransform {

  transform(value: number | string | undefined): number {
    if (value == null) {
      return 0;
    }

    return Number(value);
  }

}
