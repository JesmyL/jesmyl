import { SourceBased } from '#shared/const/SourceBased';
import type { CmAdditionalCategory } from '#shared/model/cm/cat/Cat.model';
import { CmCatKind, CmCatWid, CmComWid, IExportableCat, IExportableCom } from 'shared/api';
import { cmAdditionalCategoryName } from 'shared/const/cm/additionalCategories';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { extractNumber } from 'shared/utils';
import { translateBase } from 'shared/utils/locale/base';
import { objectKeys } from 'shared/utils/object.utils';

export class CmCat extends SourceBased<IExportableCat> {
  readonly additional: CmAdditionalCategory | null;

  constructor(top: IExportableCat, additional: CmAdditionalCategory | null = null) {
    super(top);
    this.additional = additional;
  }

  static fromAdditional(additional: CmAdditionalCategory) {
    return new CmCat(
      {
        w: CmCatWid.def,
        m: 0,
        n: '',
        k: CmCatKind.list,
      },
      additional,
    );
  }

  /** Название вычисляется при чтении: к моменту первого рендера локаль может быть ещё не загружена. */
  get name() {
    if (this.additional) return cmAdditionalCategoryName(this.additional.num);
    if (this.top.w === CmCatWid.all) return translateBase(BaseLocaleKey.CmAllCategoryName);

    return this.top.n;
  }

  get wid() {
    return this.additional?.w ?? this.top.w;
  }

  private _stackSet: Set<CmComWid> | null = null;
  get stackSet() {
    return (this._stackSet ??= new Set(this.top.s));
  }

  get dict() {
    return this.top.d ?? {};
  }

  get kind() {
    return this.top.k;
  }

  get comws() {
    return this.top.s ?? objectKeys(this.dict).map(extractNumber);
  }

  hasCom(com: IExportableCom) {
    if (this.wid === CmCatWid.all) return true;
    if (this.additional) return this.additional.track(com);

    return this.kind === CmCatKind.dict ? !!this.dict[com.w] : this.stackSet.has(com.w);
  }

  /** Пустая категория не должна показываться пользователю: она ведёт в пустой список песен. */
  hasComs(coms: IExportableCom[]) {
    if (this.wid === CmCatWid.all) return true;

    return this.additional ? coms.some(com => this.hasCom(com)) : this.comws.length > 0;
  }
}
