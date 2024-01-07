export interface User {
  id?: string;
  username?: string;
  password?: string;
  name?: string;
  role?: string;
  token?: string;
  balance?: number;
}

export interface ApiDataResponse<T> {
  result: T[];
  message: string;
  messageDetail: string;
  total: number | null;
  statusCode: number;
}

export interface ApiResponse<T> {
  result: T;
  message: string;
  messageDetail: string;
  statusCode: number;
}

export class Pagination {
  offset: number = 1;
  pageSize: number = 10;
}

export class Sorting {
  sortBy: boolean = false;
  column: string = '';
}

export class ListConfig {
  // columnMode?: ColumnMode = ColumnMode.force;
  headerHeight?: number = 40;
  rowHeight?: any = 'auto';
  footerHeight?: number = 50;
  limit?: number = 10;
  externalPaging?: boolean = true;
  externalSorting?: boolean = true;
  scrollbarH?: boolean = true;
  scrollbarV?: boolean = false;
  reorderable?: boolean = true;
}

export interface StatsModel {
  activeWebSite: number;
  blockedWebSite: number;
  passiveWebSite: number;
  totalWebSite: number;
}
