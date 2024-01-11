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
import { AuthService } from 'src/core/services/auth.service';
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
      roles: ['Admin'],
      isCollapsed: false,
      sub: [
        {
          title: 'Products',
          route: 'products',
          roles: ['Admin'],
        },
        {
          title: 'Categories',
          route: 'categories',
          roles: ['Admin'],
        },
      ],
    },
    {
      icon: 'mdi mdi-laptop',
      title: 'Admin Panel Ayarları',
      roles: ['Admin'],
      isCollapsed: false,
      sub: [
        {
          title: 'Kullanıcılar',
          route: 'users',
          roles: ['Admin'],
        },
        {
          title: 'Tema Ayarları',
          route: 'themesettings',
          roles: ['Admin'],
        },
        {
          title: 'Roller',
          route: 'roles',
          roles: ['Admin'],
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
        }))
        .map((route) => {
          const role = this.auth.currentUserValue.role;
          if (route.sub && route.sub.some((x) => x.roles && x.roles.length)) {
            route.sub = route.sub.filter(
              (x) => x.roles && x.roles.length && x.roles.includes(role)
            );
          }

          return route;
        })
        .filter(
          (route) =>
            (route.roles &&
              route.roles.length &&
              route.roles.includes(this.auth.currentUserValue.role)) ||
            !route.roles
        );

      return mapped;
    })
  );

  constructor(
    protected jsLoader: JsLoaderService,
    protected location: Location,
    protected router: Router,
    protected auth: AuthService
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
