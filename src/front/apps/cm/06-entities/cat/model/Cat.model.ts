import { CmCom } from '$cm/ext';
import { CmCat } from '../lib/Cat';

export interface CmCatComWrap<C = CmCom> {
  item: C;
  deep?: number;
  field?: string;
  rate?: number;
}

export type CmCatKind = string;

export interface CmCatTracker {
  title: string;
  id: CmCatKind;
  select: (com: CmCom, cat: CmCat) => boolean;
}
