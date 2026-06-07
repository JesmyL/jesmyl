import { makeRegExp } from 'regexpert';
import { checkIsArray, checkIsString } from './checkIs';
import { ruLowerLettersStr, slavicLowerLettersStr } from './cm/com/const';
import { quickSort } from './sort';
import { itIt } from './utils';

export const searchConstants = {
  REMOVE: ['REMOVE'] as const,
  POSITION: ['POSITION'] as const,
  INDEX: ['INDEX'] as const,
};

const constantPositions = [searchConstants.INDEX, searchConstants.POSITION];

type Trace = string | (typeof searchConstants)[keyof typeof searchConstants];

export const searchRate = <
  T,
  R extends { item: T; deep: number; rate: number; field: string; pos: string[] },
  RetItem extends R = R,
>(
  items: T[],
  searchWord: string,
  places: (Trace[] | Trace)[],
  isNumberSearch?: boolean,
  mapNumListItem: (num: number) => number = itIt,
): RetItem[] => {
  const normalWords = (
    isNumberSearch
      ? searchWord.split(makeRegExp('/0+/'))
      : searchWord.split(makeRegExp(`/[^a-z0-9'ʼ${slavicLowerLettersStr}]+/i`))
  ).filter(itIt);

  const words = normalWords.map(word => word.toLowerCase());
  const wordRegs = normalWords.map(word => internationalWordReg(word, isNumberSearch));

  return items.reduce((ferries: RetItem[], item, itemi) => {
    const ferry = { item, deep: 0, rate: 0, pos: [] } as never as RetItem;

    if (
      places.some((place, placei) => {
        ferry.deep = placei;
        const index = constantPositions.indexOf(place as never);

        if (index + 1) {
          const rateIndex = words.findIndex(word =>
            word && words.length > 1
              ? `${mapNumListItem(itemi + index)}` === word
              : `${itemi + index}`.startsWith(word),
          );

          if (rateIndex + 1) {
            ferry.rate = 1;
            return true;
          }
          return false;
        }

        const searchInPlace = (searchPath: unknown[], str: string, level: number) => {
          str = str.toLowerCase();
          let noWord = false;

          const currRate = words.reduce((accRate: number | null, _word, wordi) => {
            if (noWord || !wordRegs[wordi]) return null;
            const index = str.search(wordRegs[wordi]);
            if (index < 0) {
              noWord = true;
              return null;
            }

            ferry.pos.push(searchPath.concat(index).join('/'));

            return (accRate ?? 0) + index + level;
          }, null);

          if (noWord || currRate == null) return false;

          ferry.rate = currRate;
          return true;
        };

        const search = (searchPath: unknown[], track: Trace[] | Trace, target: unknown, level: number) => {
          let searched = false;

          [track].flat().reduce((nestedTarget, trace, tracei, tracea) => {
            if (!nestedTarget) return null;

            if (trace === searchConstants.INDEX && checkIsArray(nestedTarget)) {
              searched = nestedTarget.some((o, oi) =>
                search(
                  searchPath.concat(`${searchConstants.INDEX[0]}:${oi}`),
                  track.slice(tracei + 1),
                  o,
                  (level + tracei) * 10,
                ),
              );

              return null;
            }

            const nextStr = (nestedTarget as Record<string, unknown>)?.['' + trace];

            if (tracei >= tracea.length - 1 && checkIsString(nextStr)) {
              searched = searchInPlace(searchPath.concat(trace), nextStr, level);
            }

            return nextStr;
          }, target);

          return searched;
        };

        return search(checkIsArray(place) ? [place[0]] : [], place, item, placei);
      })
    )
      ferries.push(ferry as never);

    return ferries;
  }, []);
};

const numberSearchReplacements: [RegExp, string][] = [
  [/0/g, '[ 0]'],
  [/1/g, `[^${ruLowerLettersStr}1`],
  [/2/g, '[абвг2]'],
  [/3/g, '[деёжз3]'],
  [/4/g, '[ийкл4]'],
  [/5/g, '[мноп5]'],
  [/6/g, '[рсту6]'],
  [/7/g, '[фхцч7]'],
  [/8/g, '[шщъы8]'],
  [/9/g, '[ьэюя9]'],
];

const textSearchReplacements: [RegExp, string][] = [
  [/[ыіi]/g, '[ыії]'],
  [/[ъ'ʼ]/g, "[ъ'ʼ]"],
  [/[эє]/g, '[эє]'],
  [/[гґ]/g, '[гґ]'],
  [/[её]/g, '[её]'],
];

const internationalWordReg = (word: string, isNumberSearch?: boolean) => {
  return makeRegExp(
    `/${(isNumberSearch ? numberSearchReplacements : textSearchReplacements)
      .reduce((acc, [from, to]) => acc.replace(from, to), word)
      .toLowerCase()}/`,
  );
};

export const searchRateWithSort = <
  T,
  R extends { item: T; deep: number; rate: number; field: string; pos: string[] },
  RetItem extends R = R,
>(
  items: T[],
  searchWord: string,
  places: (Trace[] | Trace)[],
  isNumberSearch?: boolean,
): { list: Promise<RetItem[]>; reset: () => void } => {
  const { promise, reject, resolve } = Promise.withResolvers<RetItem[]>();
  const reseter: { t: TimeOut } = { t: undefined };

  const result = searchRate<T, R, RetItem>(items, searchWord, places, isNumberSearch);

  setTimeout(() => {
    resolve(quickSort(result, (a, b) => a.rate - b.rate, 3, reseter));
  }, 0);

  return {
    list: promise,
    reset: () => {
      reject();
      clearTimeout(reseter.t);
    },
  };
};
