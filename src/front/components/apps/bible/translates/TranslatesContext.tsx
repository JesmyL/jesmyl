import React, { useContext, useEffect, useState } from 'react';
import { bibleTitles } from '../hooks/bibleTitlesJson';
import { bibleMolecule } from '../molecules';
import { BibleTranslateName } from './complect';
import { useBibleMyTranslates, useBibleShowTranslatesValue } from './hooks';

interface ChapterCombine {
  chapters?: (string[][] | null)[];
  lowerChapters?: string[][][];
  htmlChapters?: ({ __html: string }[][] | und)[];
}

const mapChapters = (tName: BibleTranslateName, { chapters }: { chapters: (string[][] | null)[] }) => {
  const lowerChapters: string[][][] = [];

  for (const book of chapters) {
    if (book == null) continue;
    const lowerBook = (lowerChapters[lowerChapters.length] = [] as string[][]);

    for (const chapter of book) {
      const lowerChapter = (lowerBook[lowerBook.length] = [] as string[]);

      for (const verse of chapter) lowerChapter[lowerChapter.length] = verse.toLowerCase();
    }
  }

  const htmlChapters = chapters.map(book => book?.map(chapter => chapter.map(__html => ({ __html }))));

  localTranslates[tName] = {
    chapters,
    lowerChapters,
    htmlChapters,
  };
};

export const bibleLowerBooks = bibleTitles.titles.map(book => book.map(title => title.toLowerCase()));

export type BibleBookTranslates = Partial<Record<BibleTranslateName, ChapterCombine>>;
const loadings: Partial<Record<BibleTranslateName, boolean>> = {};
let localTranslates: BibleBookTranslates = {};

const Context = React.createContext<BibleBookTranslates>({});

export const useBibleTranslatesContext = () => useContext(Context);

interface Props {
  children?: React.ReactNode;
  isSetAllTranslates?: boolean;
}
export default function BibleTranslatesContextProvider({ children, isSetAllTranslates }: Props): JSX.Element {
  const showTranslates = useBibleShowTranslatesValue();
  const [myTranslates] = useBibleMyTranslates();
  const [translates, setTranslates] = useState<BibleBookTranslates>(localTranslates);
  const watchTranslates = isSetAllTranslates ? myTranslates : showTranslates;

  useEffect(() => {
    const subscribes: (() => void)[] = [];

    return hookEffectLine()
      .setTimeout(() => {
        let tryTimeout: TimeOut;
        let updateTimeout: TimeOut;

        const tryLoad = () => {
          watchTranslates.forEach(tName => {
            if (localTranslates[tName] !== undefined) {
              if (!watchTranslates.some(tName => localTranslates[tName] === undefined)) {
                clearTimeout(updateTimeout);
                updateTimeout = setTimeout(() => setTranslates({ ...localTranslates }), 200);
              }
              return;
            }

            if (loadings[tName]) {
              clearTimeout(tryTimeout);
              tryTimeout = setTimeout(tryLoad, 100);
              return;
            }

            loadings[tName] = true;
            const tAtom = bibleMolecule.take(tName);

            subscribes.push(
              tAtom.subscribe(value => {
                if (value === null) return;
                mapChapters(tName, value);
                setTranslates({ ...localTranslates });
              }),
            );

            (async () => {
              try {
                const content = await tAtom.getStorageValue();
                content && mapChapters(tName, content);
                loadings[tName] = false;

                if (!watchTranslates.some(tName => localTranslates[tName] === undefined)) {
                  setTranslates({ ...localTranslates });
                }
              } catch (error) {
                loadings[tName] = false;
              }
            })();
          });
        };

        tryLoad();
      }, 500)
      .effect(...subscribes);
  }, [watchTranslates]);

  return <Context.Provider value={translates}>{children}</Context.Provider>;
}
