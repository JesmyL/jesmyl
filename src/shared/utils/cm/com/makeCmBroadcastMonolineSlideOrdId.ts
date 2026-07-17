import { CmComNewlinerLinei, CmComNewlinerRepeati, CmComOrderWid } from 'shared/api';
import { CmBroadcastMonolineSlideLineId, CmBroadcastMonolineSlideOrdStrId } from 'shared/model/cm/broadcast';

export const makeCmBroadcastMonolineSlideOrdLineId = (
  ordw: CmComOrderWid,
  linei: CmComNewlinerLinei,
  repeati: CmComNewlinerRepeati | nil,
  sameLinei: number | nil,
): CmBroadcastMonolineSlideOrdStrId => `w${ordw}l${makeCmBroadcastMonolineSlideLineId(linei, repeati, sameLinei)}`;

export const makeCmBroadcastMonolineSlideLineId = (
  linei: CmComNewlinerLinei,
  repeati: CmComNewlinerRepeati | nil,
  sameLinei: number | nil,
): CmBroadcastMonolineSlideLineId =>
  `${linei}${repeati ? (`r${repeati}` as const) : ('' as const)}${sameLinei ? (`s${sameLinei}` as const) : ('' as const)}`;
