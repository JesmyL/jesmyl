import { escapeRegExpSymbols, makeRegExp } from 'regexpert';
import { checkIsArray, checkIsString } from './checkIs';
import { kzLowerLettersStr, ruLowerLettersStr, slavicLowerLettersStr } from './cm/com/const';
import { lazyInit } from './lazyInit';
import { objectKeys } from './object.utils';
import { transcriptEnToRuText, transcriptRuToEnText, transcriptSimilarEnToRuText } from './ru-en-letters';
import { quickSort } from './sort';
import { itIt } from './utils';

export const searchConstants = {
  REMOVE: ['REMOVE'] as const,
  POSITION: ['POSITION'] as const,
  INDEX: ['INDEX'] as const,
};

const constantPositions = [searchConstants.INDEX, searchConstants.POSITION];

type Trace = string | (typeof searchConstants)[keyof typeof searchConstants];

export const internationalWordReg = (word: string, isNumberSearch?: boolean) => {
  const innerRegFn = internationalWordRegInner();
  return innerRegFn(word, !!isNumberSearch);
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
    ъ: "ь'ʼ",
    ь: "ъ'ʼ",
    ш: 'щ',
    щ: 'ш',
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
  const normalWords = isNumberSearch
    ? searchWord.split(makeRegExp('/0+/')).filter(itIt)
    : searchWord
        .split(makeRegExp(`/[^a-z0-9'ʼ\\[\\]<>{}:"\\;,\\.${slavicLowerLettersStr}${kzLowerLettersStr}]+/i`))
        .filter(itIt);

  const lowerWords = normalWords.map(word => word.toLowerCase());

  const hasNumericWord = lowerWords.some(word => !isNaN(Number(word)) || !isNaN(Number(transcriptEnToRuText(word))));

  const wordRegs = normalWords.map((word, wordi) => {
    const wordLower = lowerWords[wordi];
    const toRu = transcriptEnToRuText(wordLower);
    const toEn = transcriptRuToEnText(wordLower);
    const similarRu = transcriptSimilarEnToRuText(word);

    const variants = [internationalWordReg(wordLower, isNumberSearch)];

    if (toRu !== wordLower) {
      variants.push(internationalWordReg(toRu, isNumberSearch));
    }
    if (toEn !== wordLower) {
      variants.push(internationalWordReg(toEn, isNumberSearch));
    }
    if (similarRu !== wordLower && similarRu !== toRu) {
      variants.push(internationalWordReg(similarRu, isNumberSearch));
    }

    const regPattern = `(?:${variants.join('|')})`;
    return makeRegExp(
      wordLower.length < 3
        ? `/(^|[^${slavicLowerLettersStr}${kzLowerLettersStr}])${regPattern}($|[^${slavicLowerLettersStr}${kzLowerLettersStr}])/`
        : `/${regPattern}/`,
    );
  });

  return items.reduce((ferries: RetItem[], item, itemi) => {
    const ferry = { item, deep: 0, rate: 0, pos: [] } as never as RetItem;
    if (
      places.some((place, placei) => {
        ferry.deep = placei;
        const index = constantPositions.indexOf(place as never);

        if (index > -1) {
          if (!hasNumericWord) return false;

          const rateIndex = lowerWords.findIndex(word => {
            if (!word) return false;
            const toRu = transcriptEnToRuText(word);
            const toEn = transcriptRuToEnText(word);
            const similarRu = transcriptSimilarEnToRuText(word);

            const matchOrig =
              lowerWords.length > 1 ? `${mapNumListItem(itemi + index)}` === word : `${itemi + index}`.startsWith(word);
            const matchRu =
              lowerWords.length > 1 ? `${mapNumListItem(itemi + index)}` === toRu : `${itemi + index}`.startsWith(toRu);
            const matchEn =
              lowerWords.length > 1 ? `${mapNumListItem(itemi + index)}` === toEn : `${itemi + index}`.startsWith(toEn);
            const matchSimilarRu =
              lowerWords.length > 1
                ? `${mapNumListItem(itemi + index)}` === similarRu
                : `${itemi + index}`.startsWith(similarRu);

            return matchOrig || matchRu || matchEn || matchSimilarRu;
          });
          if (rateIndex > -1) {
            ferry.rate = 1;
            return true;
          }
          return false;
        }

        const searchInPlace = (searchPath: unknown[], str: string, level: number) => {
          if (!checkIsString(str)) return false;
          str = str.toLowerCase();
          let noWord = false;

          const currRate = lowerWords.reduce((accRate: number | null, _word, wordi) => {
            if (noWord || !wordRegs[wordi]) return null;
            const matchIndex = str.search(wordRegs[wordi]);
            if (matchIndex < 0) {
              noWord = true;
              return null;
            }
            ferry.pos.push(searchPath.concat(matchIndex).join('/'));

            const isStartsWith = matchIndex === 0;
            const levelPenalty = isStartsWith ? level * 10 : level * 1000 + 5000;

            return (accRate as number) + levelPenalty + matchIndex;
          }, 0);

          if (noWord || currRate == null) return false;

          ferry.rate = currRate;
          return true;
        };

        const search = (searchPath: unknown[], track: Trace[] | Trace, target: unknown, level: number): boolean => {
          let searched = false;

          [track].flat().reduce((nestedTarget, trace, tracei, tracea) => {
            if (!nestedTarget) return null;

            if (trace === searchConstants.INDEX && checkIsArray(nestedTarget)) {
              const nextTrack = track.slice(tracei + 1);

              searched = nestedTarget.some((o, oi) => {
                const currentPath = searchPath.concat(`${searchConstants.INDEX}:${oi}`);
                if (nextTrack.length === 0 && checkIsString(o)) {
                  return searchInPlace(currentPath, o, level + tracei);
                }
                return search(currentPath, nextTrack, o, level + tracei + 1);
              });
              return null;
            }

            const nextStr = (nestedTarget as Record<string, unknown>)?.['' + trace];

            if (tracei >= tracea.length - 1) {
              if (checkIsString(nextStr)) {
                searched = searchInPlace(searchPath.concat(trace), nextStr, level + tracei);
              } else if (checkIsArray(nextStr)) {
                searched = nextStr.some((o, oi) => {
                  if (checkIsString(o)) {
                    return searchInPlace(
                      searchPath.concat(trace, `${searchConstants.INDEX}:${oi}`),
                      o,
                      level + tracei + 1,
                    );
                  }
                  return false;
                });
              }
            }

            return nextStr;
          }, target);

          return searched;
        };

        return search(checkIsArray(place) ? [place] : [], place, item, placei * 10);
      })
    )
      ferries.push(ferry as never);

    return ferries;
  }, []);
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
