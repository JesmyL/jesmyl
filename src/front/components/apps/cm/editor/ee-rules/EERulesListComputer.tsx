import { mylib } from 'front/utils';
import { memo, useEffect, useState } from 'react';
import { itIt, makeRegExp } from 'shared/utils';
import { bibleMolecule } from '../../../bible/molecules';
import { eeStorage } from '../../base/ee-storage/EeStorage';
import { useEditableCols } from '../col/useEditableCols';

const emptyArr = [] as [];

export const EERulesListComputer = memo(function ListComputer({
  isCheckBible,
  listBox,
  setUpdates,
}: {
  isCheckBible: boolean;
  setUpdates: React.Dispatch<React.SetStateAction<number>>;
  listBox: { list: string[] };
}) {
  const cols = useEditableCols();
  const [store, setStore] = useState<string[]>([]);
  const [etap, setEtap] = useState('Подготовка');

  useEffect(() => {
    eeStorage.load().then(store => setStore(mylib.keys(store)));
  }, []);

  useEffect(() => {
    if (!cols) return;

    let timeout: TimeOut;
    const etap = (etapTitle: string, cb: () => void) => {
      setEtap(etapTitle);
      timeout = setTimeout(cb, 10);
    };

    etap('Считывание текстов', async () => {
      const texts: string[] = [
        cols.cats.map(col => col.name),
        cols.coms.map(col => (col.texts ? [col.name, ...col.texts] : col.name)),
        isCheckBible ? (await bibleMolecule.take('rst').getStorageValue())?.chapters ?? emptyArr : emptyArr,
        isCheckBible ? (await bibleMolecule.take('nrt').getStorageValue())?.chapters ?? emptyArr : emptyArr,
        isCheckBible
          ? (await bibleMolecule.take('kas').getStorageValue())?.chapters?.filter(itIt) ?? emptyArr
          : emptyArr,
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

                    function add(word: string) {
                      if (word.search(makeRegExp('/[іїєґ]/')) < 0 && word.search(makeRegExp('/е/')) > -1)
                        words.push(word);
                    }

                    const addWord = () => {
                      const wordsList = spaceds.slice(wordi, wordi + size);
                      wordi += size;

                      if (!wordsList.length) {
                        etap('Сортировка слов', () => {
                          listBox.list = words;

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
  }, [cols, isCheckBible, listBox, setUpdates, store]);

  return <>{etap}</>;
});
