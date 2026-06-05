import { CmCom } from '$cm/ext';
import { ReactNode } from 'react';
import { IExportableOrder, OrderRepeats, SpecialOrderRepeatsKey } from 'shared/api';
import { KindBlock } from 'shared/values/cm/block-kinds/KindBlock';
import { CmComOrder } from '../lib/Order';
import { CmComOrderWidClass } from '../lib/OrderWid';

export type CmComOrderEditableRegion<Ord extends CmComOrder> = {
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
  others: number[] | null;
};

export type ICmComOrderExportableMe<OrderConstructor extends CmComOrderWidClass<OrderConstructor>> = {
  top: IExportableOrder;
  header: (bag?: CmComOrderTopHeaderBag | nil, isRequired?: boolean) => string;
} & Partial<{
  source: ICmComOrderExportableMe<OrderConstructor>;
  init: IExportableOrder;

  leadOrd: OrderConstructor; // first of ord inheritance chain
  watchOrd: OrderConstructor | nil; // same ord of its ref
  targetOrd: OrderConstructor | nil; // leader of watch ord
  ord: OrderConstructor;

  prev: OrderConstructor | null;
  next: OrderConstructor | null;
  prevOrd: OrderConstructor | null;
  nextOrd: OrderConstructor | null;
  isAnchor: boolean;
  isTarget: boolean;
  isInherit: boolean;
  isAnchorInherit: boolean;
  isAnchorInheritPlus: boolean;
  text: string;
  chords: string;
  chordLabels: string[][];
  positions: number[][];
  repeats: OrderRepeats | null; // Повторения
  isNextInherit: boolean;
  isNextAnchorOrd: boolean;
  isPrevTargetOrd: boolean;
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
