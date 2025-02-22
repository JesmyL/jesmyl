import { useSelectedComs } from '@cm/base/useSelectedComs';
import { ReactNode } from 'react';
import { Com } from '../Com';

export interface ComFaceInheritProps {
  comDescription?: (com: Com, comi: number) => ReactNode;
  isPutCcomFaceOff?: boolean;
}

export interface ListComFaceForSelectionsProps {
  selectedComPosition: ReturnType<typeof useSelectedComs>['selectedComPosition'];
  toggleSelectedCom: ReturnType<typeof useSelectedComs>['toggleSelectedCom'];
}
