import { escapeRegExpSymbols, makeRegExp } from 'regexpert';
import { checkIsArray, checkIsString } from './checkIs';
import { kzLowerLettersStr, ruLowerLettersStr, slavicLowerLettersStr } from './cm/com/const';
import { lazyInit } from './lazyInit';
import { objectKeys } from './object.utils';
import { transcriptEnToRuText, transcriptRuToEnText } from './ru-en-letters';
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
  isNumberSearch: boolean = false,
  mapNumListItem: (num: number) => number = itIt,
): RetItem[] => {
  const normalWords = (
    isNumberSearch
      ? searchWord.split(makeRegExp('/0+/'))
      : searchWord.split(makeRegExp(`/[^a-z0-9'ʼ\\[\\]\\;,\\.${slavicLowerLettersStr}${kzLowerLettersStr}]+/i`))
  ).filter(itIt);

  const wordsForPositions: string[] = [];
  const wordGroups: RegExp[][] = [];
  const innerRegFn = internationalWordRegInner();

  normalWords.forEach(word => {
    const wordLower = word.toLowerCase();
    const toRu = transcriptEnToRuText(wordLower);
    const toEn = transcriptRuToEnText(wordLower);

    const group: RegExp[] = [];

    wordsForPositions.push(wordLower);
    group.push(makeRegExp(`/${innerRegFn(wordLower, isNumberSearch)}/`));

    if (toRu !== wordLower) {
      wordsForPositions.push(toRu);
      group.push(makeRegExp(`/${innerRegFn(toRu, isNumberSearch)}/`));
    }
    if (toEn !== wordLower) {
      wordsForPositions.push(toEn);
      group.push(makeRegExp(`/${innerRegFn(toEn, isNumberSearch)}/`));
    }

    wordGroups.push(group);
  });

  return items.reduce((ferries: RetItem[], item, itemi) => {
    const ferry = { item, deep: 0, rate: 0, pos: [] } as never as RetItem;
    const missingGroupIndices = new Set<number>(wordGroups.keys());

    const searchInPlace = (searchPath: unknown[], str: string, level: number) => {
      str = str.toLowerCase();
      let hasMatches = false;

      for (const g of [...missingGroupIndices]) {
        const group = wordGroups[g];
        let bestGroupIndex = -1;

        for (let i = 0; i < group.length; i++) {
          const index = str.search(group[i]);
          if (index >= 0) {
            if (bestGroupIndex === -1 || index < bestGroupIndex) {
              bestGroupIndex = index;
            }
          }
        }

        if (bestGroupIndex >= 0) {
          missingGroupIndices.delete(g);
          ferry.pos.push(searchPath.concat(bestGroupIndex).join('/'));
          ferry.rate += bestGroupIndex + level;
          hasMatches = true;
        }
      }

      return hasMatches;
    };

    const search = (searchPath: unknown[], track: Trace[] | Trace, target: unknown, level: number) => {
      let searched = false;

      [track].flat().reduce((nestedTarget, trace, tracei, tracea) => {
        if (!nestedTarget) return null;

        if (trace === searchConstants.INDEX && checkIsArray(nestedTarget)) {
          nestedTarget.forEach((o, oi) => {
            const nextTrack = track.slice(tracei + 1);
            const currentPath = searchPath.concat(`${searchConstants.INDEX}:${oi}`);

            if (nextTrack.length === 0 && checkIsString(o)) {
              if (searchInPlace(currentPath, o, level)) searched = true;
            } else {
              if (search(currentPath, nextTrack, o, (level + tracei) * 10)) searched = true;
            }
          });

          return null;
        }

        const nextStr = (nestedTarget as Record<string, unknown>)?.['' + trace];

        if (tracei >= tracea.length - 1 && checkIsString(nextStr)) {
          if (searchInPlace(searchPath.concat(trace), nextStr, level)) searched = true;
        }

        return nextStr;
      }, target);

      return searched;
    };

    places.forEach((place, placei) => {
      ferry.deep = placei;
      const index = constantPositions.indexOf(place as never);

      if (index + 1) {
        const rateIndex = wordsForPositions.findIndex(word =>
          word && wordsForPositions.length > 1
            ? `${mapNumListItem(itemi + index)}` === word
            : `${itemi + index}`.startsWith(word),
        );

        if (rateIndex + 1) {
          ferry.rate = 1;
          wordGroups.forEach((_, g) => missingGroupIndices.delete(g));
        }
        return;
      }

      search(checkIsArray(place) ? [place] : [], place, item, placei);
    });

    if (missingGroupIndices.size === 0) {
      ferries.push(ferry as never);
    }

    return ferries;
  }, []);
};

export const internationalWordRegInner = lazyInit(() => {
  const numberReps: Record<string, string> = {
    0: ' ',
    1: `^${ruLowerLettersStr}`,
    2: 'абвг',
    3: 'деёжз',
    4: 'ийкл',
    5: 'мноп',
    6: 'рсту',
    7: 'фхцч',
    8: 'шщъы',
    9: 'ьэюя',
  };

  const letterReps: Record<string, string> = {
    ы: 'їiі',
    ъ: "'ʼ",
    э: 'є',
    г: 'ґғ',
    е: 'ё',
    к: 'қ',
    н: 'ң',
    у: 'үұ',
    о: 'ө',
    а: 'ә',
  };

  const letters = objectKeys(letterReps);
  const numbers = objectKeys(numberReps);

  letters.forEach(lead => (letterReps[lead] = `[${letterReps[lead]}${lead}]`));
  numbers.forEach(lead => (numberReps[lead] = `[${numberReps[lead]}${lead}]`));

  const letterReg = makeRegExp(`/[${letters.join('')}]/gi`);
  const numberReg = makeRegExp(`/\\d/g`);

  const letterRepl = (all: string) => letterReps[all] || letterReps[all.toLowerCase()];
  const numberRepl = (all: string) => numberReps[all];

  return (word: string, isNumberSearch: boolean) => {
    return `${(isNumberSearch ? escapeRegExpSymbols(word).replace(numberReg, numberRepl) : escapeRegExpSymbols(word).replace(letterReg, letterRepl)).toLowerCase()}`;
  };
});

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
  const reseter: { t: ReturnType<typeof setTimeout> | undefined } = { t: undefined };

  const result = searchRate<T, R, RetItem>(items, searchWord, places, isNumberSearch);

  reseter.t = setTimeout(() => {
    resolve(quickSort(result, (a, b) => a.rate - b.rate, 3, reseter));
  }, 0);

  return {
    list: promise,
    reset: () => {
      reject();
      if (reseter.t) clearTimeout(reseter.t);
    },
  };
};
