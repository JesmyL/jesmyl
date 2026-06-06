import { CmCatKind } from '#shared/model/cm/cat/Cat.model';
import { CmComWid, IExportableCat } from 'shared/api';
import { smylib } from 'shared/utils';
import { objectKeys } from 'shared/utils/object.utils';
import { BaseNamed } from './BaseNamed';
import { cmEditorCategoryTrackers } from './cmEditorCategoryTrackers';
import { CmCom } from './Com';

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
    return (this._stackSet ??= new Set(this.top.s));
  }

  get dict() {
    return this.top.d;
  }

  get kind(): CmCatKind {
    return this.top.k;
  }

  get comws(): CmComWid[] {
    return this.top.s ?? objectKeys(this.top.d ?? {}).map(Number);
  }

  static sortedSearch(term: string, coms: CmCom[], isNumberSearch?: boolean) {
    if (term) {
      return smylib.searchRateWithSort(
        coms,
        term,
        ['name', 'number', ['orders', smylib.c.INDEX, 'text']],
        isNumberSearch,
      );
    } else {
      return { list: Promise.resolve(coms.map(com => ({ item: com }))), reset: () => {} };
    }
  }
}
