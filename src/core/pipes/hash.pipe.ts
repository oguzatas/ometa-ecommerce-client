import { Pipe, PipeTransform } from '@angular/core';
import { HashHelper } from '../helpers/hash.helper';

@Pipe({
  name: 'hash',
})
export class HashPipe implements PipeTransform {
  transform(value: string): any {
    return HashHelper.getHash(value);
  }
}
