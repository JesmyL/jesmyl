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
