export interface PageableResponse<T> {
  total: number;
  items: T[];
  limit: number;
  offset: number;
}
