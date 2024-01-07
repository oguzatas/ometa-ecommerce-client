import { Location } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeRoute',
})
export class ActiveRoutePipe implements PipeTransform {
  constructor(protected location: Location) {}
  transform(route: any): any {
    const path = this.location.path().slice(1);
    if (!route.sub) {
      return path == route.route;
    }

    return ((route.sub as any[]) || []).some((x) => x.route === path);
  }
}
