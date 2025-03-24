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
      <div
        className="text-5xl my-10 font-bold text-x3"
        attr-chapteri={chapteri}
        attr-versei={0}
      >
        Глава {chapteri + 1}
      </div>
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
