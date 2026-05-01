import { CmCom } from '$cm/ext';
import { ReactNode } from 'react';
import { IExportableOrder, IExportableOrderFieldValues, OrderRepeats } from 'shared/api';
import { KindBlock } from 'shared/values/cm/block-kinds/KindBlock';
import { CmComOrder } from '../lib/Order';
import { CmComOrderWidClass } from '../lib/OrderWid';

export type CmComOrderEditableRegion<Ord extends CmComOrder> = {
  count: number;

  key: string;
  startKey: string;
  endKey: string;

  startLinei: number | null;
  startWordi: number | null;

  endLinei: number | null;
  endWordi: number | null;
  isEndWordiLast: boolean;

  startOrd: Ord | null;
  endOrd: Ord | null;
  /** [endLinei, endWordi] in other order */
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
  repeats?: string;
}

export interface CmComOrderExecArgs<Value> {
  wid?: number | null;
  value?: Value;
  fieldn?: keyof IExportableOrderFieldValues;
  linei?: number;
  line?: number[];
  lineTitle?: string;
}

export interface CmComOrderField {
  name: keyof IExportableOrder;
  title: string;
  isExt?: boolean;
  extIf?: (poss?: [] | null) => boolean;
  type: string | string[];
}

export interface ICmComOrderHeaderProps extends ICmComOrderProps {
  headerNode: ReactNode;
}

export interface ICmComOrderProps {
  chordedOrd: boolean;
  ord: CmComOrder;
  ordi: number;
  positions?: number[];
  isJoinLetters: boolean;
  com: CmCom;
}
