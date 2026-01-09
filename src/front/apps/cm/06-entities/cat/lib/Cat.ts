import { mylib } from '#shared/lib/my-lib';
import { CmCom } from '$cm/ext';
import { BaseNamed } from '$cm/shared/lib';
import { CmComWid, IExportableCat } from 'shared/api';

export class CmCat extends BaseNamed<IExportableCat> {
  term?: string;

  constructor(
    top: IExportableCat,
    public coms: CmCom[],
  ) {
    super(top);

    if (this.kind === 'lang:ru') this.coms = coms.filter(com => com.langi === 0);
    else if (this.kind === 'lang:ua') this.coms = coms.filter(com => com.langi === 1);
    else {
      const comwsSet = new Set(this.top.s ?? mylib.keys(this.top.d ?? {}).map(Number));
      this.coms = coms.filter(com => comwsSet.has(com.wid));
    }
  }

  get stack() {
    return this.getBasicOr('s', []);
  }
  set stack(val: number[]) {
    this.setExportable('s', val);
  }

  get dict() {
    return this.getBasic('d');
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

  get comws(): CmComWid[] {
    return this.top.s ?? mylib.keys(this.top.d ?? {}).map(Number);
  }

  static sortedSearch(term: string, coms: CmCom[], isNumberSearch?: boolean) {
    if (term) {
      return mylib.searchRateWithSort(
        coms,
        term,
        ['name', 'number', ['orders', mylib.c.INDEX, 'text']],
        isNumberSearch,
      );
    } else {
      return { list: Promise.resolve(coms.map(com => ({ item: com }))), reset: () => {} };
    }
  }
}
