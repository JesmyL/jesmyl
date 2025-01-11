import { MyLib, mylib } from 'front/utils';
import { itIt, makeRegExp } from 'shared/utils';
import { CmState } from '../../Cm.model';
import { CmEditorStoraged } from '../../editor/CmEditor.model';
import { cmMolecule } from '../../molecules';
import { Com } from '../com/Com';
import { Cat } from './Cat';
import { CatTracker } from './Cat.model';

export const catTrackers: CatTracker[] = [
  {
    title: 'Полный',
    id: 'full',
    select: () => true,
  },
  {
    title: 'Сборник',
    id: 'dict',
    select: (com: Com, cat: Cat) => !!cat.dict?.[com.wid],
  },
  {
    title: 'Список',
    id: 'list',
    select: (com: Com, cat: Cat) => cat.stack?.includes(com.wid),
  },
  {
    title: 'Язык - Русский',
    id: 'lang:ru',
    select: (com: Com) => !com.langi,
  },
  {
    title: 'Язык - Украинский',
    id: 'lang:ua',
    select: (com: Com) => com.langi === 1,
  },
];

export type CatSpecialSearches = {
  title: string;
  map: (coms: Com[], term: string) => Com[];
  isRerenderOnInput?: boolean;
};

const delayedValueSetDefiner = <Key extends keyof (CmState & CmEditorStoraged), Value>(
  key: Key,
  defaultValue: Value,
  mapper: (value: (CmState & CmEditorStoraged)[Key]) => Value,
) => {
  let value: Value | und;
  let isNeedLoad = true;

  return (): Value => {
    if (value === undefined && isNeedLoad) {
      isNeedLoad = false;
      const setKnownChordsSet: typeof mapper = chords => {
        value = mapper(chords);

        return value;
      };

      cmMolecule.take(key).subscribe(setKnownChordsSet);
      setKnownChordsSet(cmMolecule.get(key));

      return defaultValue;
    }

    return value ?? defaultValue;
  };
};

// const knownChordsSet = delayedValueSetDefiner('chordTracks', new Set<string>(), chords => new Set(MyLib.keys(chords)));
const eeIncorrectWordsReg = delayedValueSetDefiner('eeStorage', /^ееее$/, value => {
  const notRuLetter = '([^а-яёіґїє])';
  return new RegExp(
    notRuLetter +
      '(' +
      MyLib.keys(value)
        .filter(word => value[word] === 2 || (mylib.isArr(value[word]) && value[word].includes(2)))
        .join('|') +
      ')' +
      notRuLetter,
    'ig',
  );
});

export const catSpecialSearches: Record<`@${string}`, CatSpecialSearches> = {
  '@audioLess': {
    title: 'Песни без аудио',
    map: coms => coms.filter(com => !com.audio.trim()),
  },
  '@lineLen:': {
    title: 'Со сторкой больше чем:элементов[50]',
    map: (coms, term) => {
      const count = +term.split(':')[1] || 50;
      return coms.filter(com => com.texts?.some(text => text.split('\n').some(t => t.length > count)));
    },
  },
  '@repeatsMatch:': {
    title: 'Ключи повторений по регулярке:/~/i',
    map: (coms, term) => {
      try {
        const regStr = term.slice(term.indexOf(':') + 1) || '/~/i';
        const reg = makeRegExp(regStr as never);

        return coms.filter(
          com =>
            com.ords?.some(ord =>
              mylib.isNum(ord.top.r) ? `${ord.top.r}`.match(reg) : MyLib.keys(ord.top.r).some(key => key.match(reg)),
            ),
        );
      } catch (error) {
        return [];
      }
    },
  },
  '@matchInRepeatedText:': {
    title: 'Поиск по блоку с повторениями:/\\/\\//i',
    map: (coms, term) => {
      try {
        const regStr = term.slice(term.indexOf(':') + 1) || '/\\/\\//i';
        const reg = makeRegExp(regStr as never);

        return coms.filter(com => com.orders?.some(ord => ord.repeatedText().match(reg)));
      } catch (error) {
        return [];
      }
    },
  },
  '@filterPositionsUnequalChordsCounts': {
    title: 'Количество аккордов не равна аппликатуре',
    map: (coms, term) => {
      return coms.filter(
        com =>
          com.ords?.some(
            ord =>
              ord.top.c != null &&
              ord.top.p &&
              com.chords?.[ord.top.c]
                .split('\n')
                .some(
                  (line, linei, linea) =>
                    line &&
                    linei < linea.length - 1 &&
                    line.trim().split(' ').filter(itIt).length !== ord.top.p![linei]?.length,
                ),
          ),
      );
    },
  },
  // '@withUnknownChords': {
  //   title: 'С неизвестными аккордами',
  //   isRerenderOnInput: true,
  //   map: coms => {
  //     const knownChordsSetLocal = knownChordsSet();

  //     return coms.filter(com => {
  //       const difference = new Set(
  //         com
  //           .transposedBlocks()
  //           ?.map(block => block.split(makeRegExp('/[\\s.-]+/')))
  //           .flat()
  //           .filter(itIt),
  //       ).difference(knownChordsSetLocal);

  //       return difference.size;
  //     });
  //   },
  // },
  '@incorrect-ЁЕ': {
    title: 'Некорректные Ё-Е',
    isRerenderOnInput: true,
    map: coms => {
      const reg = eeIncorrectWordsReg();

      return coms.filter(com => com.texts != null && reg.exec(' ' + com.name + '\n' + com.texts.join('\n') + ' '));
    },
  },
};
