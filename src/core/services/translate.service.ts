import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import en from '../lang/en';
import tr from '../lang/tr';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  protected activeLanguage = new BehaviorSubject(
    localStorage.getItem('active-lang') || 'tr'
  );

  constructor() {
    if (!localStorage.getItem('active-lang')) {
      localStorage.setItem('active-lang', 'tr');
    }
  }

  getActiveLanguage() {
    return this.activeLanguage.asObservable();
  }

  setActiveLanguage(lang: string): void {
    this.activeLanguage.next(lang);
  }

  translate(key: string, dynamicValues?: { [key: string]: string }) {
    return this.getActiveLanguage().pipe(
      map(() => this.instant(key, dynamicValues))
    );
  }

  translateOnce(key: string, dynamicValues?: { [key: string]: string }) {
    return this.translate(key, dynamicValues).pipe(take(1));
  }

  instant(key: string, dynamicValues?: { [key: string]: string }) {
    const activeLang = this.activeLanguage.value == 'tr' ? tr : en;
    return this.getTranslation(key, activeLang, dynamicValues);
  }

  private accessPropByString(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, ''); // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  }

  private getTranslation(key, lang, dynamicValues?: { [key: string]: string }) {
    let result = this.accessPropByString(lang, key);

    if (typeof result != 'string') {
      return key;
    }

    if (typeof result === 'string' && result.length === 0) {
      return key;
    }

    // Replace dynamic values in the translation
    if (dynamicValues) {
      for (const dynamicKey in dynamicValues) {
        if (dynamicValues.hasOwnProperty(dynamicKey)) {
          const placeholder = `{{${dynamicKey}}}`;
          result = result.replace(
            new RegExp(placeholder, 'g'),
            dynamicValues[dynamicKey]
          );
        }
      }
    }

    return result;
  }
}
