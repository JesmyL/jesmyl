import { ICmComOrderLineProps } from '$cm/entities/com-order-line';
import { CmComOrder } from '$cm/ext';
import { ChordVisibleVariant } from '$cm/shared/model';
import { CmCom } from '../../com/lib/Com';
import { ICmComOrderHeaderProps } from './Order.model';

export interface ICmComOrderListProps {
  asHeaderComponent?: (props: ICmComOrderHeaderProps) => React.ReactNode;
  asLineComponent?: (props: ICmComOrderLineProps) => React.ReactNode;
  asContentAfterOrder?: (props: { ord: CmComOrder }) => React.ReactNode;
  com: CmCom;
  isMiniAnchor?: boolean;
  fontSize?: number;
  chordVisibleVariant: ChordVisibleVariant;
  showInvisibles?: boolean;
  listRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}
