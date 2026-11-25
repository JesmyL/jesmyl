import { Atom } from 'atomaric';
import { CmComAudioMarkPackTime, CmComAudioMarkSelector, CmComOrderWid } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { CmBroadcastMonolineSlideOrdStrId } from 'shared/model/cm/broadcast';

export type CmAudioMarkControlButtonsContextIdDict = PRecord<
  CmBroadcastMonolineSlideOrdStrId | CmComOrderWid,
  React.ReactNode[]
>;
export type CmAudioMarkControlButtonsContextAfterIdDict = PRecord<
  'before' | CmComOrderWid | CmBroadcastMonolineSlideOrdStrId,
  React.ReactNode[]
>;

export type CmAudioMarkControlButtonsContextMapNode = (
  node: React.ReactNode,
  time: CmComAudioMarkPackTime,
  selector: CmComAudioMarkSelector,
  isUnknownMark: boolean,
  isPending: boolean,
) => React.ReactNode;

export type CmAudioMarkControlButtonsContextProps = {
  preTimeAtom: Atom<number>;
  isNeedCompute?: boolean;
  com: CmCom;
  isHideShortTime?: boolean;
  mapNode: CmAudioMarkControlButtonsContextMapNode;
  pendingMarks?: PRecord<CmComAudioMarkPackTime, CmComAudioMarkSelector | nil> | nil;
  children: React.ReactNode;
};
