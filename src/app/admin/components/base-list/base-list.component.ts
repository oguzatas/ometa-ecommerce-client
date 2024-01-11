import { Component, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import {
  ApiDataResponse,
  ListConfig,
  Pagination,
  Sorting,
} from 'src/core/models/user';
import { BaseService } from './base.service';

type ModalSettings = {
  component: any;
  options: {
    [key: string]: any;
  };
};

@Component({
  template: '',
})
export abstract class BaseListComponent<T> implements OnDestroy {
  destroy$ = new Subject();
  editModal: ModalSettings;
  addModal: ModalSettings;
  filter: any = {};
  dataList$: Observable<ApiDataResponse<T>>;
  pager = new Pagination();
  listConfig = new ListConfig();
  sorting = new Sorting();
  dataSubject$ = new BehaviorSubject<ApiDataResponse<T>>(null);
  columnMode: ColumnMode = ColumnMode.force;
  protected activatedRoute: ActivatedRoute;
  protected router: Router;
  constructor(
    protected service: BaseService<T>,
    protected modal: NgbModal,
    protected injector: Injector
  ) {
    this.activatedRoute = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.pager.offset = 0;

    this.dataList$ = this.activatedRoute.queryParams.pipe(
      take(1),
      switchMap((params) => {
        const { pageSize, offset, sortBy, column, ...filters } = params;

        if (pageSize) this.pager.pageSize = pageSize;
        if (offset) this.pager.offset = offset;
        if (sortBy) this.sorting.sortBy = sortBy;
        if (column) this.sorting.column = column;

        Object.assign(this.filter, filters);
        this.updateQueryParams(false);

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
      })
    );
  }

  setPage(pageInfo) {
    this.pager.offset = pageInfo.offset;
    this.updateQueryParams();
  }

  updateQueryParams(fetch = true) {
    const params = {
      ...this.pager,
      ...this.sorting,
      ...this.filter,
    };

    if (!params.column) {
      delete params.column;
      delete params.sortBy;
    }

    // Get the current URL tree
    const currentUrlTree = this.router.createUrlTree(
      [],
      this.router.parseUrl(this.router.url)
    );

    Object.keys(params).forEach((key) => {
      if (params[key]) {
        currentUrlTree.queryParams[key] = params[key];
      }
    });

    // Navigate to the updated URL
    this.router
      .navigate([], {
        queryParams: params,
        replaceUrl: true,
      })
      .then(() => fetch && this.dataSubject$.next(null));
  }

  setFilter(model) {
    this.pager.offset = 0;
    this.filter = model;
    this.updateQueryParams();
  }

  onSort(event) {
    this.sorting.column = event.column.prop;
    this.sorting.sortBy = event.newValue == 'asc' ? true : false;
    this.updateQueryParams();
  }

  resetFilter() {
    Object.keys(this.filter).forEach((key) => {
      this.filter[key] = null;
    });
    this.updateQueryParams();
  }

  edit(id: string) {
    if (!this.editModal) {
      return;
    }
    const modalRef = this.modal.open(this.editModal.component);
    modalRef.componentInstance.id = id;
    this.setModalRefOptions(modalRef, this.editModal.options);
    modalRef.result.then((r) => {
      if (r) {
        this.dataSubject$.next(null);
      }
    });
  }

  add() {
    const modalRef = this.modal.open(this.addModal.component);
    this.setModalRefOptions(modalRef, this.addModal.options);
    modalRef.result.then((r) => {
      if (r) {
        this.dataSubject$.next(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setModalRefOptions(modalRef: NgbModalRef, options: object) {
    Object.keys(options || {}).forEach((key) => {
      modalRef.componentInstance[key] = options[key];
    });
  }
}
