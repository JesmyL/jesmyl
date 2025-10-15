import { BibleChapteri } from '$bible/shared/model/base';
import { JSX, memo } from 'react';
import { BibleReaderVerseText } from './VerseText';

export const BibleReaderChapterText = memo(function BibleChapterText({
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
