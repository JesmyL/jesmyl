import { CmComOrderWidClass } from '#shared/model/cm/order/OrderWid';
import { ReactNode } from 'react';
import { IExportableOrder, SpecialOrderRepeatsKey } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { KindBlock } from 'shared/values/cm/block-kinds/KindBlock';

export type CmComOrderEditableRegion<Ord extends CmComOrder> = CmComOrderEditableRegionBase<Ord> & {
  startRate: number;
  finRate: number;
  otherRate: number;
};

export type CmComOrderEditableRegionBase<Ord extends CmComOrder> = {
  count: number;

  key: RKey<SpecialOrderRepeatsKey>;
  startKey: RKey<SpecialOrderRepeatsKey>;
  finKey: RKey<SpecialOrderRepeatsKey> | nil;

  startLinei: number | nil;
  startWordi: number | nil;

  finLinei: number | nil;
  finWordi: number | nil;
  isFinWordiLast?: boolean;

  startOrd: Ord | nil;
  finOrd: Ord | nil;
  /** [finLinei, finWordi] in other order */
  others: [linei: number, wordi: number] | null;
};

export type ICmComOrderExportableMe<OrderConstructor extends CmComOrderWidClass<OrderConstructor>> = {
  top: IExportableOrder;
  header: (bag?: CmComOrderTopHeaderBag | nil, isRequired?: boolean) => string;
} & Partial<{
  source: ICmComOrderExportableMe<OrderConstructor>;

  /** first of ord inheritance chain */
  leadOrd: OrderConstructor;
  /** same ord of its ref */
  watchOrd: OrderConstructor | nil;
  /** leader of watch ord */
  targetOrd: OrderConstructor | nil;

  prev: OrderConstructor | null;
  next: OrderConstructor | null;
  prevOrd: OrderConstructor | null;
  nextOrd: OrderConstructor | null;
  isAnchor: boolean;
  isTarget: boolean;
  isInherit: boolean;
  isAnchorInherit: boolean;
  isAnchorInheritPlus: boolean;
  isNextInherit: boolean;
  anchorInheritIndex: number;
  sourceIndex: number;
  viewIndex: number;
  kind: KindBlock;
}>;

export interface CmComOrderTopHeaderBag {
  isEdit?: boolean;
  isTexted?: boolean;
  numered?: boolean;
  repeats?: string;
}

export interface ICmComOrderHeaderAsComponentProps extends ICmComOrderProps {
  node: ReactNode;
}

export interface ICmComOrderProps {
  chordedOrd: boolean;
  ord: CmComOrder;
  ordi: number;
  positions?: (number | nil)[] | nil;
  isJoinLetters: boolean;
  com: CmCom;
}

export interface ICmComOrderAsComponentProps {
  ord: CmComOrder;
  com: CmCom;
  ordi: number;
  node: React.ReactNode;
}
