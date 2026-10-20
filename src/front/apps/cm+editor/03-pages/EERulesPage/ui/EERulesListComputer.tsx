import { translateBase } from '#basis/locale';
import { bibleTranslateLanguage } from '$bible/shared/const/consts';
import { makeBibleTbcvPrefix } from '$bible/shared/lib/tbcv.parser';
import { bibleTBCVTranslatesIDB } from '$bible/shared/state/bibleIDB';
import { useEditableCats } from '$cm+editor/shared/lib/useEditableCat';
import { useEditableComs } from '$cm+editor/shared/lib/useEditableCom';
import { cmEditorIDB } from '$cm+editor/shared/state/cmEditorIDB';
import { memo, useEffect, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { EeStorePack, Langi } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
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
  const [etap, setEtap] = useState<string>(() => translateBase(BaseLocaleKey.CmEditorPreparation));
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

    etap(
      translateBase(BaseLocaleKey.CmEditorReadTexts),
      async () => {
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

        etap(
          translateBase(BaseLocaleKey.CmEditorMonolith),
          () => {
            const text = texts.join(' ');

            etap(
              translateBase(BaseLocaleKey.CmEditorToLower),
              () => {
                const lower = text.toLowerCase();

                etap(
                  translateBase(BaseLocaleKey.CmEditorTrimNonSlavic),
                  () => {
                    const normSlavic = lower.replace(makeRegExp(`/[^${slavicLowerLettersStr}]+/gi`), ' ');

                    etap(
                      translateBase(BaseLocaleKey.CmEditorReplaceYoWithYe),
                      () => {
                        const norm = normSlavic.replace(makeRegExp('/ё/g'), 'е');

                        etap(
                          translateBase(BaseLocaleKey.CmEditorToWordList),
                          () => {
                            const splits = norm.split(' ');

                            etap(
                              translateBase(BaseLocaleKey.CmEditorFilterUnique),
                              () => {
                                const spaceds = Array.from(new Set([...storeWords, ...splits]));

                                etap(
                                  translateBase(BaseLocaleKey.CmEditorPickWordsWithYe),
                                  () => {
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
                                        etap(
                                          translateBase(BaseLocaleKey.CmEditorSortWords),
                                          () => {
                                            listBox.list = words.reverse();

                                            etap(
                                              translateBase(BaseLocaleKey.CmEditorRenderList, {
                                                n: '' + words.length,
                                              }),
                                              () => setUpdates(num => num + 1),
                                            );
                                          },
                                        );

                                        return;
                                      }

                                      wordsList.forEach(add);

                                      etap(
                                        translateBase(BaseLocaleKey.CmEditorWordChecked, { w: wordsList[0] }),
                                        addWord,
                                      );
                                    };

                                    addWord();
                                  },
                                );
                              },
                            );
                          },
                        );
                      },
                    );
                  },
                );
              },
            );
          },
        );
      },
    );

    return () => clearTimeout(timeout);
  }, [cats, coms, eeStoreRef, ignoredWordsSet, isCheckBible, listBox, setUpdates, storeWords]);

  return <>{etap}</>;
});
