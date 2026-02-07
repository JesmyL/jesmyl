import { ICmComOrderLineProps } from '$cm/entities/com-order-line';
import { CmCom, CmComOrder } from '$cm/ext';
import { ChordVisibleVariant } from '$cm/shared/model';
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
  chordHardLevel: 1 | 2 | 3;
}
