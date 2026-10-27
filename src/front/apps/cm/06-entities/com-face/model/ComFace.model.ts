import { ReactNode } from 'react';
import { CmComWid, IExportableCom } from 'shared/api';

export interface CmComFaceInheritProps {
  comDescription?: (com: IExportableCom, comi: number) => ReactNode;
  /** The com the caller plays: the player page's current com is not necessarily the last opened one. */
  currentComw?: CmComWid | nil;
  isPutCcomFaceOff?: boolean;
  /** Hides the per-track cloud download toggles, e.g. in the selected list where downloading is not allowed. */
  withoutCacheMarks?: boolean;
}
