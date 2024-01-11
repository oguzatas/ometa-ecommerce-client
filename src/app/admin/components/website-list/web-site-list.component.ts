import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { defer, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ApiDataResponse } from 'src/core/models/user';
import { WebSite, WebSiteState, WebSiteStatus } from 'src/core/models/website';
import { EventService } from 'src/core/services/event.service';
import { BaseListComponent } from '../base-list/base-list.component';
import { WebsiteService } from './websites.service';

@Component({
  selector: '[tib-list]',
  templateUrl: './web-site-list.component.html',
  styleUrls: ['./web-site-list.component.scss'],
})
export class WebSiteListComponent
  extends BaseListComponent<WebSite>
  implements OnInit
{
  constructor(
    service: WebsiteService,
    protected router: Router,
    protected eventService: EventService,
    protected modal: NgbModal,
    injector: Injector
  ) {
    super(service, modal, injector);
    this.pager.pageSize = 50;
    // this.dataList$ = defer(() => {
    //   return this.dataSubject$.pipe(
    //     switchMap((res) =>
    //       res
    //         ? of(res)
    //         : service
    //             .getAllApi(
    //               this.pager.offset.toString(),
    //               this.pager.pageSize.toString(),
    //               this.filter,
    //               this.sorting
    //             )
    //             .pipe(
    //               tap((res) => {
    //                 if (
    //                   res &&
    //                   res.result.length == 0 &&
    //                   this.pager.offset > 1
    //                 ) {
    //                   this.pager.offset =
    //                     res.total % 1 === 0
    //                       ? Math.floor(res.total / this.pager.pageSize) == 0
    //                         ? Math.floor(res.total / this.pager.pageSize)
    //                         : Math.floor(res.total / this.pager.pageSize) - 1
    //                       : Math.floor(res.total / this.pager.pageSize);

    //                   this.dataSubject$.next(null);
    //                 } else {
    //                   if (this.prevdata) {
    //                     const currValue = this.prevdata;
    //                     const myarray = [...res.result];
    //                     myarray
    //                       .filter(
    //                         (ws) =>
    //                           !currValue.result.some((vs) => vs.id == ws.id)
    //                       )
    //                       .every((fp) => currValue.result.push(fp));
    //                     this.dataSubject$.next(currValue);
    //                   } else {
    //                     this.dataSubject$.next(res);
    //                   }
    //                 }
    //               })
    //             )
    //     )
    //   );
    // });
  }

  selectedWebsite = '';

  navigatetoDetail(id: string) {
    this.router.navigate(['/detail'], {
      queryParams: {
        id: id,
      },
    });
    this.selectedWebsite = id;
    this.eventService.broadcast('hidemenu', 1);
  }

  prevdata: ApiDataResponse<WebSite>;

  ngOnInit(): void {
    // this.initScrollListener();
    this.subscribeToChanges();
    this.listenFilterTrigger();
    this.listenClearSelection();
    this.subscribeToDeletes();
    this.subscribeRefreshList();
  }

  subscribeRefreshList() {
    this.eventService.subscribe('refreshlist', () =>
      this.dataSubject$.next(null)
    );
  }

  listenClearSelection() {
    this.eventService.subscribe(
      'clearselection',
      () => (this.selectedWebsite = '')
    );
  }

  initScrollListener() {
    const list = document.getElementById('website-list');
    let self = this;
    list.addEventListener('scroll', function (e) {
      if (list.scrollTop === list.scrollHeight - list.offsetHeight) {
        self.prevdata = self.dataSubject$.value;
        self.pager.offset += 1;
        self.dataSubject$.next(null);
      }
    });
  }

  subscribeToChanges() {
    this.eventService.subscribe('updateinlist', (r: WebSite) => {
      if (this.dataSubject$.value) {
        const currValue = this.dataSubject$.value;
        const index = currValue.result.findIndex((ws) => ws.id == r.id);
        if (index > -1) {
          currValue.result[index] = r;
        } else {
          currValue.result.push(r);
        }
        this.dataSubject$.next(currValue);
      }
    });
  }

  subscribeToDeletes() {
    this.eventService.subscribe('removeinlist', (r: string) => {
      if (this.dataSubject$.value) {
        const currValue = this.dataSubject$.value;
        const index = currValue.result.findIndex((ws) => ws.id == r);
        if (index > -1) {
          currValue.result.splice(index, 1);
        }
        this.dataSubject$.next(currValue);
      }
    });
  }

  listenFilterTrigger() {
    this.eventService.subscribe('filtertrigger', (filtervalue) => {
      this.filter['name'] = filtervalue;
      this.pager.offset = 1;
      this.prevdata = null;
      this.dataSubject$.next(null);
    });
  }

  getCellClass(site: WebSite) {
    if (site.status == WebSiteStatus.Active) {
      if (site.state == WebSiteState.Online) {
        return 'text-success';
      } else {
        return 'text-danger';
      }
    } else {
      return 'text-warning';
    }
  }
}
