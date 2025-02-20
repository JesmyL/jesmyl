import { ReactNode, RefObject } from 'react';
import { ChordVisibleVariant } from '../../../basis/model/Cm.model';
import { Com } from '../Com';
import { IComLineProps, IComOrdHeaderProps } from '../order/Order.model';

export interface IComOrdersProps {
  asHeaderComponent?: (props: IComOrdHeaderProps) => ReactNode;
  asLineComponent?: (props: IComLineProps) => ReactNode;
  com: Com;
  isMiniAnchor?: boolean;
  fontSize?: number;
  chordVisibleVariant: ChordVisibleVariant;
  showInvisibles?: boolean;
  listRef?: RefObject<HTMLDivElement>;
}
