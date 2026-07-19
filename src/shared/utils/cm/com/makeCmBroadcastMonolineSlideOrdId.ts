import {
  CmComLinei,
  CmComLineiZero,
  CmComNewlinerRepeati,
  CmComNewlinerRepeatiZero,
  CmComNewlinerSamei,
  CmComOrderWid,
} from 'shared/api';
import { CmBroadcastMonolineSlideOrdStrId, CmBroadcastMonolineSlideSelectorId } from 'shared/model/cm/broadcast';

export const convertCmBroadcastMonolineSlideOrdLineId = (it: CmBroadcastMonolineSlideSelectorId) =>
  makeCmBroadcastMonolineSlideOrdLineStrId(it[0], it[1] ?? CmComLineiZero, it[2], it[3]);

export const makeCmBroadcastMonolineSlideOrdLineId = (
  ordw: CmComOrderWid,
  linei: CmComLinei,
  repeati: CmComNewlinerRepeati | nil,
  samei: CmComNewlinerSamei | nil,
): CmBroadcastMonolineSlideSelectorId =>
  samei
    ? [ordw, linei, repeati ?? CmComNewlinerRepeatiZero, samei]
    : repeati
      ? [ordw, linei, repeati]
      : linei
        ? [ordw, linei]
        : [ordw];

export const makeCmBroadcastMonolineSlideOrdLineStrId = (
  ordw: CmComOrderWid,
  linei: CmComLinei,
  repeati: CmComNewlinerRepeati | nil,
  samei: CmComNewlinerSamei | nil,
): CmBroadcastMonolineSlideOrdStrId =>
  `w${ordw}l${linei}${repeati ? (`r${repeati}` as const) : ('' as const)}${samei ? (`s${samei}` as const) : ('' as const)}`;
