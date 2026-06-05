import { OrderRepeats, SpecialOrderRepeats, SpecialOrderRepeatsKey } from 'shared/api';
import { checkIsNaN, checkIsNumber } from '../checkIs';
import { enLowerLettersSet } from '../ru-en-letters';

export const makeCmComOrderRepeatOrSelf = (repeats: OrderRepeats | nil) =>
  checkIsNumber(repeats) ? { '.': repeats } : (repeats as SpecialOrderRepeats | nil);

export const takeCmComOrderRepeatPortalKeyLetter = <
  Key extends RKey<SpecialOrderRepeatsKey>,
  Ret extends Key extends SpecialOrderRepeatsKey.PortalStart | SpecialOrderRepeatsKey.PortalEnd
    ? 'a' | 'b'
    : 'a' | 'b' | nil,
>(
  key: Key,
): Ret =>
  (cmComOrderCheckRepeatKeyIsPortalStart(key)
    ? key[0]
    : cmComOrderCheckRepeatKeyIsPortalEnd(key)
      ? key.at(-1)
      : null) as never;

export const cmComOrderCheckRepeatKeyPortalLetterIsOtherSide = (
  key: string,
  letter: 'a' | 'b',
  isKeyStart = cmComOrderCheckRepeatKeyIsPortalStart(key),
): key is SpecialOrderRepeatsKey.PortalStart => (isKeyStart ? key.endsWith(letter) : key.startsWith(letter));

export const cmComOrderCheckRepeatKeyIsPortalStart = (key: string): key is SpecialOrderRepeatsKey.PortalStart =>
  enLowerLettersSet.has(key[0] as 'a');

export const cmComOrderCheckRepeatKeyIsPortalEnd = (key: string): key is SpecialOrderRepeatsKey.PortalEnd =>
  enLowerLettersSet.has(key.at(-1) as 'b');

export const cmComOrderRepeatFlagKey = (linei: number | nil, wordi: number | nil) =>
  linei == null || wordi == null ? null : (`~${linei}:${wordi}` as SpecialOrderRepeatsKey.Flag);

export const cmComOrderCheckRepeatKeyIsFlag = (key: string): key is SpecialOrderRepeatsKey.Flag => key?.startsWith('~');

export const cmComOrderCheckRepeatKeyIsPortal = (key: string) =>
  cmComOrderCheckRepeatKeyIsPortalStart(key) || cmComOrderCheckRepeatKeyIsPortalEnd(key);

export const cmComOrderMakeRepeatPortalKey = (
  linei: number | nil,
  wordi: number | nil,
  letter: 'a' | 'b' | nil,
  isStartNotFinish: boolean,
) =>
  linei == null || wordi == null || letter == null
    ? null
    : (`${isStartNotFinish ? letter : ''}${linei}:${wordi}${isStartNotFinish ? '' : letter}` as
        | SpecialOrderRepeatsKey.PortalStart
        | SpecialOrderRepeatsKey.PortalEnd);

export const cmComOrderMakeRepeatInnerDiapasonKey = (
  resultStartKey: SpecialOrderRepeatsKey.LineWord | SpecialOrderRepeatsKey.Line | nil,
  resultEndKey: SpecialOrderRepeatsKey.LineWord | SpecialOrderRepeatsKey.Line | nil,
) =>
  resultStartKey && resultEndKey && resultStartKey !== resultEndKey
    ? (`${resultStartKey}-${resultEndKey}` as SpecialOrderRepeatsKey.Diapason)
    : resultStartKey || resultEndKey;

export const cmComOrderMakeRepeatInnerEndKey = (
  startLinei: number | nil,
  isLastWordi: boolean | nil,
  linei: number | nil,
  wordi: number | nil,
) =>
  linei == null
    ? null
    : !wordi || isLastWordi
      ? (`${linei}` as SpecialOrderRepeatsKey.Line)
      : (`${linei === startLinei ? '' : linei}:${wordi}` as SpecialOrderRepeatsKey.LineWord);

export const cmComOrderMakeRepeatInnerStartKey = (linei: number | nil, wordi: number | nil) =>
  linei == null
    ? null
    : !wordi
      ? (`${linei}` as SpecialOrderRepeatsKey.Line)
      : (`${linei}:${wordi}` as SpecialOrderRepeatsKey.LineWord);

export const cmComOrderTakeRepeatInnerKeyComponents = (
  key: RKey<SpecialOrderRepeatsKey>,
  lineWordsList: string[][],
) => {
  const [beg, end] = key.split('-');
  const [startLinei, startWordi = 0] = beg.split(':').map(num => parseInt(num));
  let finLinei = 0;
  let finWordi = 0;
  let isEndWordiLast = false;

  if (end) {
    [finLinei, finWordi] = (end || '').split(':').map(num => parseInt(num));
    if (checkIsNaN(finLinei)) finLinei = startLinei;
    if (finWordi == null) {
      finWordi = (lineWordsList[finLinei] || '').length - 1;
      isEndWordiLast = true;
    }
  } else [finLinei, finWordi] = [startLinei, (lineWordsList[startLinei] || '').length - 1];

  return { startWordi, startLinei, isEndWordiLast, finLinei, finWordi };
};
