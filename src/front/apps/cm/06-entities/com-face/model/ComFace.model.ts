import { ReactNode } from 'react';
import { IExportableCom } from 'shared/api';

export interface CmComFaceInheritProps {
  comDescription?: (com: IExportableCom, comi: number) => ReactNode;
  isPutCcomFaceOff?: boolean;
}
