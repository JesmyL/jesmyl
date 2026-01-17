import { CmCom } from '$cm/ext';
import { CmComIntensityLevel } from 'shared/api';
import { CmCat } from '../lib/Cat';

export interface CmCatComWrap<C = CmCom> {
  item: C;
  deep?: number;
  field?: string;
  rate?: number;
}

export type CmCatKind = 'full' | 'dict' | 'list' | `lang:${'ru' | 'ua'}` | `int:${CmComIntensityLevel}`;

export type CmCatTracker = Record<
  CmCatKind,
  {
    title: string;
    select: (com: CmCom, cat: CmCat) => boolean;
  }
>;
