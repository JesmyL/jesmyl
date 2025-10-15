import { ReactNode } from 'react';
import { IExportableOrder, IExportableOrderFieldValues, OrderRepeats } from 'shared/api';
import { StyleBlock } from 'shared/values/cm/block-styles/StyleBlock';
import { CmCom } from '../../com/lib/Com';
import { CmComOrder } from '../lib/Order';

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
  others: number[] | null;
};

export type ICmComOrderExportableMe = {
  top: IExportableOrder;
  header: (bag?: CmComOrderTopHeaderBag | nil, isRequired?: boolean) => string;
} & Partial<{
  source: ICmComOrderExportableMe;
  init: IExportableOrder;

  leadOrd: CmComOrder; // first of ord inheritance chain
  watchOrd: CmComOrder | nil; // same ord of its ref
  targetOrd: CmComOrder | nil; // leader of watch ord
  ord: CmComOrder;

  prev: CmComOrder | null;
  next: CmComOrder | null;
  prevOrd: CmComOrder | null;
  nextOrd: CmComOrder | null;
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
  style: StyleBlock;
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
  visibleOrdi?: number;
  positions?: number[];
  isJoinLetters: boolean;
  com: CmCom;
}
