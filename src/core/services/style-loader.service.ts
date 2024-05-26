import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StyleLoaderService {
  private styles: { [key: string]: HTMLLinkElement } = {};

  loadStyle(name: string, url: string): void {
    if (this.styles[name]) {
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
    this.styles[name] = link;
  }

  unloadStyle(name: string): void {
    const link = this.styles[name];
    if (link) {
      document.head.removeChild(link);
      delete this.styles[name];
    }
  }
}
