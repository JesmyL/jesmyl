import React, { useContext, useEffect, useState } from 'react';
import { BibleTranslateName } from 'shared/api';
import { Eventer } from 'shared/utils';
import { bibleTranslatesIDB } from '../_db/bibleIDB';
import { bibleTitles } from '../hooks/bibleTitlesJson';
import { BibleTranslate } from '../model';
import { bibleAllTranslates } from './complect';
import { useBibleMyTranslates, useBibleShowTranslatesValue } from './hooks';

interface ChapterCombine {
  lowerChapters?: (string[][] | und)[];
  chapters?: ((string[] | und)[] | nil)[];
}

const mapChapters = (tName: BibleTranslateName, { chapters }: { chapters: (string[][] | nil)[] }) => {
  const lowerChapters: string[][][] = [];

  for (const book of chapters) {
    if (book == null) continue;
    const lowerBook = (lowerChapters[lowerChapters.length] = [] as string[][]);

    for (const chapter of book) {
      const lowerChapter = (lowerBook[lowerBook.length] = [] as string[]);

      for (const verse of chapter) lowerChapter[lowerChapter.length] = verse.toLowerCase();
    }
  }

  localTranslates[tName] = {
    lowerChapters,
    chapters,
  };
};

const onTranslateSetEvents = Eventer.createValue<{ tName: BibleTranslateName; value: BibleTranslate }>();
const tNames = new Set(bibleAllTranslates);

bibleTranslatesIDB.hook('updating', (_, tName, obj) => {
  if (tNames.has(tName as never)) onTranslateSetEvents.invoke({ tName: tName as never, value: obj.val });
});

bibleTranslatesIDB.hook('creating', (tName, obj) => {
  if (tNames.has(tName as never)) onTranslateSetEvents.invoke({ tName: tName as never, value: obj.val });
});

export const bibleLowerBooks = bibleTitles.titles.map(book => book.map(title => title.toLowerCase()));

export type BibleBookTranslates = PRecord<BibleTranslateName, ChapterCombine>;
const loadings: PRecord<BibleTranslateName, boolean> = {};
let localTranslates: BibleBookTranslates = {};

const Context = React.createContext<BibleBookTranslates>({});

export const useBibleTranslatesContext = () => useContext(Context);

interface Props {
  children?: React.ReactNode;
  isSetAllTranslates?: boolean;
}
export const BibleTranslatesContextProvider = ({ children, isSetAllTranslates }: Props): JSX.Element => {
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

            subscribes.push(
              onTranslateSetEvents.listen(({ tName, value }) => {
                mapChapters(tName, value);
                setTranslates({ ...localTranslates });
              }),
            );

            (async () => {
              try {
                const content = await bibleTranslatesIDB.get[tName]();
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
};
