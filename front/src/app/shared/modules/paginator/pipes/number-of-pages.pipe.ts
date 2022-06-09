import { Pipe, PipeTransform } from '@angular/core';
import { PageableResponse } from '@root/app/shared/models/pageable-response';

@Pipe({
  name: 'numberOfPages',
})
export class NumberOfPagesPipe implements PipeTransform {

  transform(response: Pick<PageableResponse<any>, 'total' | 'limit'>): number {
    if (!response) {
      return undefined;
    }

    if (response.total <= response.limit) {
      return 1;
    }

    return Math.ceil(response.total / response.limit);
  }

}
