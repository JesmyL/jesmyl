import { CmComIntensityLevel, IExportableCom, LangCode } from 'shared/api';
import { CmCat } from 'shared/const/cm/Cat';
import { CmCom } from 'shared/const/cm/Com';

export interface CmCatComWrap<C = CmCom> {
  item: C;
  deep?: number;
  field?: string;
  rate?: number;
}

export type CmCatKind = 'full' | 'dict' | 'list' | `lang:${LangCode}` | `int:${CmComIntensityLevel}`;

export type CmCatTracker = Record<CmCatKind, (com: IExportableCom, cat: CmCat) => boolean>;
