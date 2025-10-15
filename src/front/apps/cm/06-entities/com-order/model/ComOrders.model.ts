import { ICmComOrderLineProps } from '$cm/entities/com-order-line';
import { ChordVisibleVariant } from '$cm/shared/model';
import { ReactNode, RefObject } from 'react';
import { CmCom } from '../../com/lib/Com';
import { ICmComOrderHeaderProps } from './Order.model';

export interface ICmComOrderListProps {
  asHeaderComponent?: (props: ICmComOrderHeaderProps) => ReactNode;
  asLineComponent?: (props: ICmComOrderLineProps) => ReactNode;
  com: CmCom;
  isMiniAnchor?: boolean;
  fontSize?: number;
  chordVisibleVariant: ChordVisibleVariant;
  showInvisibles?: boolean;
  listRef?: RefObject<HTMLDivElement | null>;
  className?: string;
}
