import { HttpParams } from '@angular/common/http';

export function getRequestParams(
  filterModel,
  paging: { page: string; pageSize: string },
  sorting: { sortBy: 0 | 1; column: string }
) {
  let params = new HttpParams();
  if (filterModel) {
    Object.keys(filterModel).forEach((key) => {
      if (filterModel[key] != null && filterModel[key] != '')
        params = params.append(key, filterModel[key]);
    });
  }

  if (sorting && sorting.column != '') {
    params = params.append('sortBy', sorting.sortBy.toString());
    params = params.append('column', sorting.column);
  }

  if (paging) {
    params = params.append('size', paging.pageSize);
    params = params.append('page', paging.page);
  }

  return params;
}
