import { cmEditorCategoryTrackers } from '#shared/const/cm/cmEditorCategoryTrackers';
import { mylib } from '#shared/lib/my-lib';
import { CmCom } from '$cm/ext';
import { BaseNamed } from '$cm/shared/lib';
import { CmComWid, IExportableCat } from 'shared/api';
import { CmCatKind } from '../model/Cat.model';

export class CmCat extends BaseNamed<IExportableCat> {
  term?: string;

  constructor(
    top: IExportableCat,
    public coms: CmCom[],
  ) {
    super(top);

    if (this.kind === 'full') this.coms = coms;
    else {
      const { select } = cmEditorCategoryTrackers[this.kind];
      this.coms = coms.filter(com => select(com, this));
    }
  }

  private _stackSet: Set<number> | null = null;
  get stackSet() {
    return (this._stackSet ??= new Set(this.stack));
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

  get kind(): CmCatKind {
    return this.getBasic('k');
  }
  set kind(val: CmCatKind) {
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
