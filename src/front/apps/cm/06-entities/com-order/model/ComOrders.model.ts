import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { ICmComOrderAsComponentProps, ICmComOrderHeaderAsComponentProps } from '#shared/model/cm/order/regions';
import { ICmComOrderLineAsComponentProps } from '$cm/entities/com-order-line';
import { CmCom } from 'shared/const/cm/Com';
import { CmComOrder } from 'shared/const/cm/order/Order';

export interface ICmComOrderListProps {
  asHeaderNode?: (props: ICmComOrderHeaderAsComponentProps) => React.ReactNode;
  asLineNode?: (props: ICmComOrderLineAsComponentProps) => React.ReactNode;
  asOrderNode?: (props: ICmComOrderAsComponentProps) => React.ReactNode;
  asAfterSolidOrdNode?: (props: { ord: CmComOrder }) => React.ReactNode;
  asAfterOrdNode?: (props: { ord: CmComOrder }) => React.ReactNode;
  com: CmCom;
  isMiniAnchor?: boolean;
  fontSize?: number;
  chordVisibleVariant: ChordVisibleVariant;
  showInvisibles?: boolean;
  listRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  chordHardLevel: 1 | 2 | 3;
}
