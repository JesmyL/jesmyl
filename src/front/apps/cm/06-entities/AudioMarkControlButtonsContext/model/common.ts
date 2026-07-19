import { CmComOrderWid } from 'shared/api';
import { CmBroadcastMonolineSlideOrdStrId } from 'shared/model/cm/broadcast';

export type CmAudioMarkControlButtonsContextIdDict = PRecord<
  CmBroadcastMonolineSlideOrdStrId | CmComOrderWid,
  React.ReactNode[]
>;
export type CmAudioMarkControlButtonsContextAfterIdDict = PRecord<
  'before' | CmComOrderWid | CmBroadcastMonolineSlideOrdStrId,
  React.ReactNode[]
>;
