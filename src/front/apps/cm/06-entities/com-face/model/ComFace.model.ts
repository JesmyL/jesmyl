import { CmCom } from '$cm/ext';
import { ReactNode } from 'react';

export interface CmComFaceInheritProps {
  comDescription?: (com: CmCom, comi: number) => ReactNode;
  isPutCcomFaceOff?: boolean;
}
