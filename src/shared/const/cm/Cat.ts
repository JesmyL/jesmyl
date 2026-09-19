import { translateBase } from '#basis/locale';
import { CmComWid, IExportableCat } from 'shared/api';
import { extractNumber } from 'shared/utils';
import { objectKeys } from 'shared/utils/object.utils';
import { BaseNamed } from './BaseNamed';

export class CmCat extends BaseNamed<IExportableCat> {
  private title: string | nil;
  get name() {
    return (this.title ??= translateBase(it => it.cm.cat.li[this.top.t]));
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
    return this.top.s ?? objectKeys(this.top.d).map(extractNumber);
  }
}
