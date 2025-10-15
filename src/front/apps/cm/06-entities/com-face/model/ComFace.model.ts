import { ReactNode } from 'react';
import { CmCom } from '../../com/lib/Com';

export interface CmComFaceInheritProps {
  comDescription?: (com: CmCom, comi: number) => ReactNode;
  isPutCcomFaceOff?: boolean;
}
