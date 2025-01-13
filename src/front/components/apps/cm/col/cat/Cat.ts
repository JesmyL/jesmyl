import { mylib } from 'front/utils';
import { IExportableCat } from 'shared/api';
import { BaseNamed } from '../../base/BaseNamed';
import { Com } from '../com/Com';

export class Cat extends BaseNamed<IExportableCat> {
  term?: string;

  constructor(
    top: IExportableCat,
    public coms: Com[],
  ) {
    super(top);
  }

  get stack() {
    return this.getBasicOr('s', []);
  }
  set stack(val: number[]) {
    this.setExportable('s', val);
  }

  get dict() {
    return this.getBasicOr('d', {});
  }
  set dict(val) {
    this.setExportable('d', val);
  }

  get kind(): string {
    return this.getBasic('k');
  }
  set kind(val: string) {
    this.setExportable('k', val);
  }

  get comws() {
    return this.top.s ?? mylib.keys(this.top.d ?? {}).map(Number);
  }

  sortedSearch(term = this.term, isNumberSearch?: boolean) {
    if (term) {
      return mylib.searchRateWithSort(
        this.coms,
        term,
        ['name', 'number', ['orders', mylib.c.INDEX, 'text']],
        isNumberSearch,
      );
    } else {
      return { list: Promise.resolve(this.coms.map(com => ({ item: com }))), reset: () => {} };
    }
  }
}
