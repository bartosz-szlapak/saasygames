export class PageableResponse<T> {
  total: number;
  items: T[];
  limit: number;
  offset: number;


  constructor(count: number, items: T[], limit: number, offset: number) {
    this.total = count;
    this.items = items;
    this.limit = limit;
    this.offset = offset;
  }
}
