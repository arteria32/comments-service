export type PaginationPayload = {
  cursor?: number;
  limit: number;
};
export type PaginationBody<T> = {
  data: T[];
  cursor: number;
};
