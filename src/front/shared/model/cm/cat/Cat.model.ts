import type { IExportableCom } from 'shared/api';
import type { CmCom } from 'shared/const/cm/Com';
import { CmAdditionalCatKind } from 'shared/const/cm/enums';

export { CmAdditionalCatKind };

export interface CmCatComWrap<C = CmCom> {
  item: C;
  deep?: number;
  field?: string;
  rate?: number;
}

export type CmAdditionalCategory = {
  /** Номер в собственной нумерации виртуальных категорий. */
  num: CmAdditionalCatKind;
  /** ID маршрута: отрицательный, чтобы не пересекаться с `CmCatWid` из БД. */
  w: number;
  track: (com: IExportableCom) => boolean;
};
