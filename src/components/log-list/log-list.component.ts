import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BehaviorSubject, defer, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SystemLog } from 'src/core/models/log.model';
import {
  ApiDataResponse,
  ListConfig,
  Pagination,
  Sorting,
} from 'src/core/models/user';
import { LogListService } from './log-list.service';

@Component({
  selector: '[tib-log-list]',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss'],
})
export class LogListComponent {
  dataList$: Observable<ApiDataResponse<SystemLog>>;
  filter = {
    username: null,
    email: null,
  };
  pager = new Pagination();
  listConfig = new ListConfig();
  sorting = new Sorting();
  dataSubject$ = new BehaviorSubject<ApiDataResponse<SystemLog>>(null);
  columnMode: ColumnMode = ColumnMode.force;
  constructor(service: LogListService, private modal: NgbModal) {
    this.pager.offset = 0;
    this.dataList$ = defer(() => {
      return this.dataSubject$.pipe(
        switchMap((res) =>
          res
            ? of(res)
            : service
                .getAllApi(
                  (this.pager.offset + 1).toString(),
                  this.pager.pageSize.toString(),
                  this.filter,
                  this.sorting
                )
                .pipe(
                  tap((res) => {
                    if (
                      res &&
                      res.result.length == 0 &&
                      this.pager.offset > 0
                    ) {
                      this.pager.offset =
                        res.total % 1 === 0
                          ? Math.floor(res.total / this.pager.pageSize) == 0
                            ? Math.floor(res.total / this.pager.pageSize)
                            : Math.floor(res.total / this.pager.pageSize) - 1
                          : Math.floor(res.total / this.pager.pageSize);

                      this.dataSubject$.next(null);
                    } else {
                      this.dataSubject$.next(res);
                    }
                  })
                )
        )
      );
    });
  }

  setPage(pageInfo) {
    this.pager.offset = pageInfo.offset;
    this.dataSubject$.next(null);
  }

  setFilter(model) {
    this.pager.offset = 0;
    this.filter = model;
    this.dataSubject$.next(null);
  }

  onSort(event) {
    this.sorting.column = event.column.prop;
    this.sorting.sortBy = event.newValue == 'asc' ? true : false;
    this.dataSubject$.next(null);
  }
}
