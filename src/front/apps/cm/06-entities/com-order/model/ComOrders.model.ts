import { ICmComOrderLineAsComponentProps } from '$cm/entities/com-order-line';
import { CmCom, CmComOrder } from '$cm/ext';
import { ChordVisibleVariant } from '$cm/shared/model';
import { ICmComOrderAsComponentProps, ICmComOrderHeaderAsComponentProps } from './Order.model';

export interface ICmComOrderListProps {
  asHeaderNode?: (props: ICmComOrderHeaderAsComponentProps) => React.ReactNode;
  asLineNode?: (props: ICmComOrderLineAsComponentProps) => React.ReactNode;
  asOrderNode?: (props: ICmComOrderAsComponentProps) => React.ReactNode;
  asAfterOrderNode?: (props: { ord: CmComOrder }) => React.ReactNode;
  com: CmCom;
  isMiniAnchor?: boolean;
  fontSize?: number;
  chordVisibleVariant: ChordVisibleVariant;
  showInvisibles?: boolean;
  listRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  chordHardLevel: 1 | 2 | 3;
}
