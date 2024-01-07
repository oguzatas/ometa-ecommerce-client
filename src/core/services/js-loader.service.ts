import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { HashHelper } from '../helpers/hash.helper';

@Injectable({ providedIn: 'root' })
export class JsLoaderService {
  protected jsFiles = [
    '/assets/vendors/js/vendor.bundle.base.js',
    '/assets/js/off-canvas.js',
    '/assets/js/hoverable-collapse.js',
    '/assets/js/misc.js',
    '/assets/js/settings.js',
    '/assets/js/todolist.js',
    '/assets/js/dashboard.js',
  ];

  constructor(@Inject(DOCUMENT) protected doc: Document) {}

  loadJs(additionJsFiles = []) {
    [...this.jsFiles, ...additionJsFiles].forEach((js) => {
      const id = HashHelper.getHash(js);
      const existingElement = this.doc.getElementById(id);
      if (existingElement) {
        existingElement.remove();
        this.doc.body.append(existingElement);
      } else {
        const script = this.doc.createElement('script');
        script.src = js;
        script.setAttribute('id', id);
        this.doc.body.append(script);
      }
    });
  }
}
