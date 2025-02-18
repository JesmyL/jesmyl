import { BibleChapteri } from '#basis/model/bible';
import { memo } from 'react';
import { BibleVerseText } from './BibleVerseText';

export const BibleChapter = memo(function BibleChapter({
  list,
  chapteri,
}: {
  list: (string | und)[];
  chapteri: BibleChapteri;
}): JSX.Element {
  return (
    <>
      <h2
        attr-chapteri={chapteri}
        attr-versei={0}
      >
        Глава {chapteri + 1}
      </h2>
      {list.map((verseHTML, versei) => {
        return (
          verseHTML && (
            <BibleVerseText
              key={versei}
              versei={versei}
              chapteri={chapteri}
              html={verseHTML}
            />
          )
        );
      })}
    </>
  );
});
