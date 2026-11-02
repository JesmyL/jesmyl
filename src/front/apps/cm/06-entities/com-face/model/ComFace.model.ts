import { ReactNode } from 'react';
import { CmComWid, IExportableCom } from 'shared/api';

export interface CmComFaceInheritProps {
  comDescription?: (com: IExportableCom, comi: number) => ReactNode;
  /** The com the caller plays: the player page's current com is not necessarily the last opened one. */
  currentComw?: CmComWid | nil;
  isPutCcomFaceOff?: boolean;
  /** Shows the per-track cloud cache buttons instead of the row like button, e.g. in the player page list. */
  withCacheMarks?: boolean;
  /** Renders no like button and no cache marks for a row, e.g. in the views-rating list. */
  withoutLikeMark?: boolean;
}
