import { ReactNode } from 'react';
import { IExportableCom } from 'shared/api';

export interface CmComFaceInheritProps {
  comDescription?: (com: IExportableCom, comi: number) => ReactNode;
  isPutCcomFaceOff?: boolean;
  /** Hides the per-track cloud download toggles, e.g. in the selected list where downloading is not allowed. */
  withoutCacheMarks?: boolean;
}
