import { nounsFileStore, pronounsFileStore } from 'back/apps/index/file-stores';
import { makeRegExp, SMyLib, smylib } from 'shared/utils';

type Replacer<Ret> = (substring: string, ...args: string[]) => Ret;

interface EndVariantsDict {
  pronoun: string | Replacer<Replacer<string>>;
}

const wordRegEnds: Record<string, Record<string, EndVariantsDict>> = {
  '([ыи])$|,$': {
    йся$: {
      // отвернувшийся
      pronoun: 'еся', // отвернувшиеся
    },
    ичий$: {
      // птичий
      pronoun: 'ичьи', // птичьи
    },
    ый$: {
      // гордый
      pronoun: 'ые', // гордые
    },
    ий$: {
      // синий
      pronoun: 'ие', // синие
    },
    ой$: {
      // простой
      pronoun: 'ые', // простые
    },
  },
  '([аяь])$|(.):$': {
    ичий$: {
      // охотничий
      pronoun: 'ичья', // охотничья
    },
    щийся$: {
      // заботящийся
      pronoun: 'щаяся', // заботящаяся
    },
    '([жшчщ])[иоы]й$': {
      // большой
      pronoun: '$1ая', // большая
    },
    ний$: {
      // синий
      pronoun: 'няя', // синяя
    },
    '([иоы])й$': {
      // скорый
      pronoun: 'ая', // скорая
    },
  },
  '([оеё])$|\\.$': {
    ний$: {
      // ранний
      pronoun: 'нее', // раннее
    },
    ичий$: {
      // птичий
      pronoun: 'ичье', // птичье
    },
    щийся$: {
      // заботящийся
      pronoun: 'щееся', // заботящееся
    },
    '([жчщ])[иоы]й$': {
      // поющий
      pronoun: '$1ее', // поющее
    },
    ий$: {
      // больший
      pronoun: 'ее', // большее
    },
    '[оы]й$': {
      // большой холостой
      pronoun: 'ое', // большое холостое
    },
  },
};

const regEnds: [RegExp, [RegExp, EndVariantsDict][]][] = SMyLib.entries(wordRegEnds).map(([end, variants]) => [
  makeRegExp(`/${end}/`),
  SMyLib.entries(variants).map(([end, dict]) => [makeRegExp(`/${end}/`), dict]),
]);

const allAll = (all: string) => all;

const fixNoun = (() => {
  const reg = makeRegExp('/[^-а-яё\\d"]/gi');
  return (noun: string) => noun.replace(reg, '').replace(makeRegExp('/ /g'), '_') + (noun.startsWith('"') ? '"' : '');
})();

const fixPronoun = (() => {
  return (noun: string) =>
    noun.split('<').reverse().join('').replace(makeRegExp('/ /g'), '_') + (noun.startsWith('"') ? '"' : '');
})();

const boolItems = [true, false, false, false, false, false, false, false, false, false];

export const makeTwiceKnownName = (joinBy = ' ', fixedPronoun?: string, fixedNoun?: string): string => {
  const pronoun = fixedPronoun ?? smylib.randomItem(smylib.keys(pronounsFileStore.getValue().words), -1);
  const noun = fixedNoun ?? smylib.randomItem(smylib.keys(nounsFileStore.getValue().words), -1);

  const isReverse = smylib.randomItem(boolItems);

  for (let i = 0; i < regEnds.length; i++) {
    const match = regEnds[i][0].exec(noun);
    if (match) {
      const regEnd = regEnds[i][1];
      const invoke = (funcOrString: string | ((...match: string[]) => void)) => {
        return smylib.isFunc(funcOrString) ? funcOrString(...match) : funcOrString || allAll;
      };

      for (let j = 0; j < regEnd.length; j++) {
        if (regEnd[j][0].exec(pronoun)) {
          const p = fixPronoun(pronoun.replace(regEnd[j][0], invoke(regEnd[j][1].pronoun) as never));
          const n = fixNoun(noun);

          return isReverse ? [n, p].join(joinBy) : [p, n].join(joinBy);
        }
      }
    }
  }

  return isReverse
    ? [fixNoun(noun), fixPronoun(pronoun)].join(joinBy)
    : [fixPronoun(pronoun), fixNoun(noun)].join(joinBy);
};
