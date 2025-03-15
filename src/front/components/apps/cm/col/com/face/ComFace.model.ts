import { ReactNode } from 'react';
import { Com } from '../Com';

export interface ComFaceInheritProps {
  comDescription?: (com: Com, comi: number) => ReactNode;
  isPutCcomFaceOff?: boolean;
}
