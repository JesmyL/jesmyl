import { BibleChapteri } from '$bible/basis/model/base';
import { JSX, memo } from 'react';
import { BibleVerseText } from './VerseText';

export const BibleChapterText = memo(function BibleChapterText({
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
