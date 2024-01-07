import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { TranslateService } from '../services/translate.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  protected value: string;
  protected dynamicValues: { [key: string]: string };
  protected subscription: Subscription;

  constructor(protected translateService: TranslateService) {
    // Subscribe to the active language changes
    this.subscription = this.translateService
      .getActiveLanguage()
      .pipe(distinctUntilChanged((prev, curr) => prev == curr))
      .subscribe(() => {
        // Re-evaluate the translation when the active language changes
        this.transform(this.value, this.dynamicValues);
      });
  }

  transform(key: string, dynamicValues?: { [key: string]: string }): string {
    if (!key) return key;
    this.dynamicValues = dynamicValues;
    // Store the key to re-evaluate when the active language changes
    this.value = key;

    // Translate the key using the TranslateService
    return this.translateService.instant(key, dynamicValues);
  }

  ngOnDestroy() {
    // Unsubscribe from the active language changes to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
