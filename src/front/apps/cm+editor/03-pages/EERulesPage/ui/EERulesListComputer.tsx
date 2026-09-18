import { bibleTranslateLanguage } from '$bible/shared/const/consts';
import { makeBibleTbcvPrefix } from '$bible/shared/lib/tbcv.parser';
import { bibleTBCVTranslatesIDB } from '$bible/shared/state/bibleIDB';
import { useEditableCats } from '$cm+editor/shared/lib/useEditableCat';
import { useEditableComs } from '$cm+editor/shared/lib/useEditableCom';
import { cmEditorIDB } from '$cm+editor/shared/state/cmEditorIDB';
import { memo, useEffect, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { EeStorePack, Langi } from 'shared/api';
import { slavicLowerLettersStr } from 'shared/utils/cm/com/const';
import { objectEntries, objectKeys } from 'shared/utils/object.utils';

type Props = {
  isCheckBible: boolean;
  setUpdates: React.Dispatch<React.SetStateAction<number>>;
  listBox: { list: string[] };
  eeStoreRef: { current: EeStorePack };
};

export const CmEditorEERulesListComputer = memo(function ListComputer({
  isCheckBible,
  listBox,
  setUpdates,
  eeStoreRef,
}: Props) {
  const cats = useEditableCats();
  const coms = useEditableComs();
  const [storeWords, setStoreWords] = useState<string[]>([]);
  const [etap, setEtap] = useState('Подготовка');
  const ignoredWordsSet = cmEditorIDB.useValue.ignoredEESet();

  useEffect(() => {
    cmEditorIDB.get.eeStore().then(store => setStoreWords(objectKeys(store)));
  }, []);

  useEffect(() => {
    let timeout: TimeOut;
    const etap = (etapTitle: string, cb: () => void) => {
      setEtap(etapTitle);
      timeout = setTimeout(cb, 10);
    };

    etap('Считывание текстов', async () => {
      const texts: string[] = [
        cats?.map(col => col.name) ?? [],
        coms?.filter(com => com.langi === Langi.Ru).map(col => (col.texts ? [col.name, col.texts] : col.name)) ?? [],
        isCheckBible
          ? (
              await bibleTBCVTranslatesIDB.tb.list
                .where('k')
                .startsWithAnyOf(
                  objectEntries(bibleTranslateLanguage)
                    .filter(([, v]) => v === Langi.Ru)
                    .map(([k]) => makeBibleTbcvPrefix(k)),
                )
                .toArray()
            ).map(it => it.v)
          : [],
      ].flat(5);

      etap('Преобразование в монолит', () => {
        const text = texts.join(' ');

        etap('В нижний регистр', () => {
          const lower = text.toLowerCase();

          etap('Обрезка неславянских символов', () => {
            const normSlavic = lower.replace(makeRegExp(`/[^${slavicLowerLettersStr}]+/gi`), ' ');

            etap('Глобальная замена ё на е', () => {
              const norm = normSlavic.replace(makeRegExp('/ё/g'), 'е');

              etap('Преобразование в список отдельных слов', () => {
                const splits = norm.split(' ');

                etap('Отсеивание неуникальных слов', () => {
                  const spaceds = Array.from(new Set([...storeWords, ...splits]));

                  etap('Отбор слов содержащих буквы "е"', () => {
                    const words: string[] = [];
                    let wordi = 0;
                    const size = 500;

                    const add = (word: string) => {
                      if (
                        word.search(makeRegExp('/[іїєґ]/')) > -1 ||
                        word.search(makeRegExp('/е/')) < 0 ||
                        ignoredWordsSet.has(word)
                      )
                        return;

                      if (eeStoreRef.current[word] === undefined) words.push(word);
                      else words.unshift(word);
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
  }, [cats, coms, eeStoreRef, ignoredWordsSet, isCheckBible, listBox, setUpdates, storeWords]);

  return <>{etap}</>;
});
