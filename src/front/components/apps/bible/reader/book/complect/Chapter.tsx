import { BibleChapteri } from '@bible/model';
import { JSX, memo } from 'react';
import { BibleReaderVerseText } from './Verse';

export const BibleReaderChapter = memo(function BibleReaderChapter({
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
            <BibleReaderVerseText
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
