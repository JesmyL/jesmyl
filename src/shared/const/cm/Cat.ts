import { translateBase } from '#basis/locale';
import { CmCatKind } from '#shared/model/cm/cat/Cat.model';
import { CmComWid, IExportableCat, IExportableCom } from 'shared/api';
import { extractNumber } from 'shared/utils';
import { objectKeys } from 'shared/utils/object.utils';
import { searchConstants, searchRateWithSort } from 'shared/utils/searchRate';
import { BaseNamed } from './BaseNamed';
import { cmEditorCategoryTrackers } from './cmEditorCategoryTrackers';
import { CmCom } from './Com';

export class CmCat extends BaseNamed<IExportableCat> {
  term?: string;

  constructor(
    top: IExportableCat,
    public coms: IExportableCom[],
  ) {
    super(top);

    if (this.kind === 'full') this.coms = coms;
    else {
      const select = cmEditorCategoryTrackers[this.kind];
      this.coms = coms.filter(com => select(com, this));
    }
  }

  private title: string | nil;
  get name() {
    return (this.title ??= translateBase(it => it.cm.cat.li[this.top.t]));
  }

  private _stackSet: Set<CmComWid> | null = null;
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
    return this.top.s ?? objectKeys(this.top.d ?? {}).map(extractNumber);
  }

  static sortedSearch(term: string, coms: CmCom[], isNumberSearch?: boolean) {
    if (term) {
      return searchRateWithSort(
        coms,
        term,
        ['name', 'number', ['orders', searchConstants.INDEX, 'text']],
        isNumberSearch,
      );
    } else {
      return { list: Promise.resolve(coms.map(com => ({ item: com }))), reset: () => {} };
    }
  }
}
