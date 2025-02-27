import { mylib } from '#shared/lib/my-lib';
import { bibleTranslatesIDB } from '@bible/_db/bibleIDB';
import { cmIDB } from '@cm/_db/cm-idb';
import { memo, useEffect, useState } from 'react';
import { BibleTranslateName } from 'shared/api';
import { emptyArray, itIt, makeRegExp } from 'shared/utils';
import { useEditableCats, useEditableComs } from '../col/useEditableCols';

type Props = {
  isCheckBible: boolean;
  setUpdates: React.Dispatch<React.SetStateAction<number>>;
  listBox: { list: string[] };
};

export const EERulesListComputer = memo(function ListComputer({ isCheckBible, listBox, setUpdates }: Props) {
  const cats = useEditableCats();
  const coms = useEditableComs();
  const [store, setStore] = useState<string[]>([]);
  const [etap, setEtap] = useState('Подготовка');
  const ignoredWordsSet = cmIDB.useValue.ignoredEESet();

  useEffect(() => {
    cmIDB.get.eeStore().then(store => setStore(mylib.keys(store ?? {})));
  }, []);

  useEffect(() => {
    if (ignoredWordsSet === null) return;

    let timeout: TimeOut;
    const etap = (etapTitle: string, cb: () => void) => {
      setEtap(etapTitle);
      timeout = setTimeout(cb, 10);
    };

    etap('Считывание текстов', async () => {
      const texts: string[] = [
        cats?.map(col => col.name) ?? emptyArray,
        coms?.map(col => (col.texts ? [col.name, ...col.texts] : col.name)) ?? emptyArray,
        isCheckBible ? (await bibleTranslatesIDB.get[BibleTranslateName.rst]())?.chapters ?? emptyArray : emptyArray,
        isCheckBible ? (await bibleTranslatesIDB.get[BibleTranslateName.nrt]())?.chapters ?? emptyArray : emptyArray,
        isCheckBible
          ? (await bibleTranslatesIDB.get[BibleTranslateName.kas]())?.chapters?.filter(itIt) ?? emptyArray
          : emptyArray,
      ].flat(10);

      etap('Преобразование в монолит', () => {
        const text = texts.join(' ');

        etap('В нижний регистр', () => {
          const lower = text.toLowerCase();

          etap('Обрезка неславянских символов', () => {
            const normSlavic = lower.replace(makeRegExp('/[^а-яёіїєґ]+/gi'), ' ');

            etap('Глобальная замена ё на е', () => {
              const norm = normSlavic.replace(makeRegExp('/ё/g'), 'е');

              etap('Преобразование в список отдельных слов', () => {
                const splits = norm.split(' ');

                etap('Отсеивание неуникальных слов', () => {
                  const spaceds = Array.from(new Set([...store, ...splits]));

                  etap('Отбор слов содержащих буквы "е"', () => {
                    const words: string[] = [];
                    let wordi = 0;
                    const size = 500;

                    const add = (word: string) => {
                      if (
                        word.search(makeRegExp('/[іїєґ]/')) < 0 &&
                        word.search(makeRegExp('/е/')) > -1 &&
                        !ignoredWordsSet.has(word)
                      )
                        words.push(word);
                    };

                    const addWord = () => {
                      const wordsList = spaceds.slice(wordi, wordi + size);
                      wordi += size;

                      if (!wordsList.length) {
                        etap('Сортировка слов', () => {
                          listBox.list = words.reverse();

                          etap(`Отрисовка списка ${words.length}`, () => setUpdates(num => num + 1));
                        });

                        return;
                      }

                      wordsList.forEach(add);

                      etap(`Проверено слово ${wordsList[0]}`, addWord);
                    };

                    addWord();
                  });
                });
              });
            });
          });
        });
      });
    });

    return () => clearTimeout(timeout);
  }, [cats, coms, ignoredWordsSet, isCheckBible, listBox, setUpdates, store]);

  return <>{etap}</>;
});
