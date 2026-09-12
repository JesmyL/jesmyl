import { bibleTbcvKeyTranslateDict } from 'shared/const/bible/tbcv';
import { BibleTbcvKey, BibleTranslateName } from 'shared/model/bible';
import { checkIsNotString } from 'shared/utils/checkIs';
import { objectEntries } from 'shared/utils/object.utils';
import { BibleBooki, BibleChapteri, BibleVersei } from '../model/base';

const MIN_OFFSET = 33;

export interface IDecodedTBCV {
  tName: BibleTranslateName;
  booki: BibleBooki;
  chapteri: BibleChapteri;
  versei: BibleVersei;
}

const REVERSE_TRANSLATION_MAP = Object.fromEntries(
  objectEntries(bibleTbcvKeyTranslateDict).map(([name, char]) => [char, name]),
);

export const bibleTbcvEncode = (
  tName: BibleTranslateName,
  booki: number,
  chapteri: number,
  versei: number,
): BibleTbcvKey => {
  const tChar = bibleTbcvKeyTranslateDict[tName];

  const bChar = String.fromCharCode(booki + MIN_OFFSET);
  const cChar = String.fromCharCode(chapteri + MIN_OFFSET);
  const vChar = String.fromCharCode(versei + MIN_OFFSET);

  return (tChar + bChar + cChar + vChar) as never;
};

export const bibleTbcvDecode = (tbcvString: BibleTbcvKey): IDecodedTBCV => {
  if (checkIsNotString(tbcvString) || tbcvString.length !== 4 || !REVERSE_TRANSLATION_MAP[tbcvString.charAt(0)]) {
    throw new Error(`Некорректный формат TBCV ключа: "${tbcvString}"`);
  }

  const tChar = tbcvString.charAt(0);

  return {
    tName: REVERSE_TRANSLATION_MAP[tChar],
    booki: tbcvString.charCodeAt(1) - MIN_OFFSET,
    chapteri: tbcvString.charCodeAt(2) - MIN_OFFSET,
    versei: tbcvString.charCodeAt(3) - MIN_OFFSET,
  };
};

export const makeBibleTbcvPrefix = (
  tName: BibleTranslateName,
  booki?: number | nil,
  chapteri?: number | nil,
): string => {
  let prefix = bibleTbcvKeyTranslateDict[tName];
  if (!prefix) throw 'getTBCVPrefix Error!';

  if (booki != null) {
    prefix += String.fromCharCode(booki + MIN_OFFSET);

    if (chapteri != null) {
      prefix += String.fromCharCode(chapteri + MIN_OFFSET);
    }
  }

  return prefix;
};
