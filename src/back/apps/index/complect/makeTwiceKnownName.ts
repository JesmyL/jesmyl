import smylib, { SMyLib } from '../../../shared/SMyLib';

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
    ичий: {
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
    ичий: {
      // охотничий
      pronoun: 'ичья', // охотничья
    },
    '([жшчщ])[иоы]й': {
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
    ичий: {
      // птичий
      pronoun: 'ичье', // птичье
    },
    '([жчщ])[иоы]й': {
      // большой поющий
      pronoun: '$1ее', // большее поющее
    },
    '[иоы]й$': {
      // холостой
      pronoun: 'ое', // холостое
    },
  },
};

const regEnds: [RegExp, [RegExp, EndVariantsDict][]][] = SMyLib.entries(wordRegEnds).map(([end, variants]) => [
  new RegExp(end),
  SMyLib.entries(variants).map(([end, dict]) => [new RegExp(end), dict]),
]);

const allAll = (all: string) => all;

const fixNoun = (() => {
  const reg = /[^- а-яё\d"]/gi;
  return (noun: string) => noun.replace(reg, '') + (noun.startsWith('"') ? '"' : '');
})();

export const makeTwiceKnownName = (pronoun: string, noun: string): [string, string] => {
  for (let i = 0; i < regEnds.length; i++) {
    const match = regEnds[i][0].exec(noun);
    if (match) {
      const regEnd = regEnds[i][1];

      for (let j = 0; j < regEnd.length; j++) {
        if (regEnd[j][0].exec(pronoun)) {
          const invoke = (funcOrString: string | ((...match: string[]) => void)) => {
            return smylib.isFunc(funcOrString) ? funcOrString(...match) : funcOrString || allAll;
          };

          return [pronoun.replace(regEnd[j][0], invoke(regEnd[j][1].pronoun) as never), fixNoun(noun)];
        }
      }
    }
  }
  return [pronoun, fixNoun(noun)];
};
