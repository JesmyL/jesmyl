import { ReactNode } from 'react';
import useSelectedComs from '../../../../../../07-basis/lib/hooks/cm/useSelectedComs';
import { Com } from '../Com';

export interface ComFaceInheritProps {
  comDescription?: (com: Com, comi: number) => ReactNode;
  isPutCcomFaceOff?: boolean;
}

export interface ListComFaceForSelectionsProps {
  selectedComPosition: ReturnType<typeof useSelectedComs>['selectedComPosition'];
  toggleSelectedCom: ReturnType<typeof useSelectedComs>['toggleSelectedCom'];
}
