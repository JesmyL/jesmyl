import { ReactNode } from 'react';
import { CmCom } from 'shared/const/cm/Com';

export interface CmComFaceInheritProps {
  comDescription?: (com: CmCom, comi: number) => ReactNode;
  isPutCcomFaceOff?: boolean;
}
