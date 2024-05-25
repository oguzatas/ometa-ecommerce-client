import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { JsLoaderService } from 'src/core/services/js-loader.service';

type MenuItem = {
  icon?: string;
  title: string;
  route?: string;
  sub?: MenuItem[];
  isCollapsed?: boolean;
  active?: boolean;
  roles?: string[];
};

@Component({
  selector: '[tib-sidebar]',
  templateUrl: 'sidebar.component.html',
  animations: [
    trigger('collapseAnimation', [
      state(
        'true',
        style({
          height: '0',
          display: 'none',
          overflow: 'hidden',
        })
      ),
      state(
        'false',
        style({
          height: '*',
          display: 'block',
          overflow: 'hidden',
        })
      ),
      transition('true <=> false', animate('300ms ease-out')),
    ]),
  ],
})
export class SidebarComponent implements AfterViewInit, OnDestroy {
  protected destroy$ = new Subject();

  protected menuCfg: MenuItem[] = [
    {
      icon: 'mdi mdi-speedometer',
      title: 'general.dashboard',
      route: 'welcome',
    },
    {
      icon: 'mdi mdi-web',
      title: 'general.webSites',
      route: 'websites',
    },
    {
      icon: 'mdi mdi-laptop',
      title: 'E-Ticaret Yönetim',

      isCollapsed: false,
      sub: [
        {
          title: 'Products',
          route: 'products',
        },
        {
          title: 'Categories',
          route: 'categories',
        },
      ],
    },
    {
      icon: 'mdi mdi-laptop',
      title: 'Admin Panel Ayarları',

      isCollapsed: false,
      sub: [
        {
          title: 'Kullanıcılar',
          route: 'users',
        },
        {
          title: 'Tema Ayarları',
          route: 'themesettings',
        },
        {
          title: 'Roller',
          route: 'roles',
        },
      ],
    },
    {
      icon: 'mdi mdi-laptop',
      title: 'Modüller',
      roles: ['Admin'],
      isCollapsed: false,
      sub: [
        {
          title: 'Blog',
          route: 'blog',
          roles: ['Admin'],
        },
        {
          title: 'Chat',
          route: 'chat',
          roles: ['Admin'],
        },
        {
          title: 'E-Mail',
          route: 'email',
          roles: ['Admin'],
        },
      ],
    },
    {
      icon: 'mdi mdi-laptop',
      title: 'Ometa Panel',
      roles: ['Admin'],
      isCollapsed: false,
      sub: [
        {
          title: 'Destek Talebi',
          route: 'support',
          roles: ['Admin'],
        },
        {
          title: 'Plan-Ödeme İşlemleri',
          route: 'payment',
          roles: ['Admin'],
        },
        {
          title: 'Dökümantasyon',
          route: 'documentation',
          roles: ['Admin'],
        },
      ],
    },
    {
      icon: 'mdi mdi-laptop',
      title: 'general.administration',
      roles: ['Admin'],
      isCollapsed: true,
      sub: [
        {
          title: 'User List',
          route: 'users',
          roles: ['Admin'],
        },
      ],
    },
  ];

  protected menuSubject = new BehaviorSubject(this.menuCfg);

  public menuItems$ = this.menuSubject.asObservable().pipe(
    switchMap((res) => (res ? of(res) : of(this.menuCfg))),
    map((items) => {
      const path = this.location.path().slice(1).split('?')[0];

      const mapped: MenuItem[] = items
        .map((item) =>
          item.sub
            ? {
                ...item,
                isCollapsed: !((item.sub as any[]) || []).some(
                  (x) => x.route === path
                ),
              }
            : item
        )
        .map((route) => ({
          ...route,
          active: !route.sub
            ? path == route.route
            : ((route.sub as any[]) || []).some((x) => x.route === path),
        }));

      return mapped;
    })
  );

  constructor(
    protected jsLoader: JsLoaderService,
    protected location: Location,
    protected router: Router
  ) {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menuSubject.next(null);
      }
    });
  }

  ngAfterViewInit(): void {
    this.jsLoader.loadJs();
  }

  toggleCollapse(event: Event, item: any): void {
    event.preventDefault();
    item.isCollapsed = !item.isCollapsed;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
