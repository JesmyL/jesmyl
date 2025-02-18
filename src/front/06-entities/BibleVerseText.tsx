import { BibleChapteri, BibleVersei } from '#basis/model/bible';
import { memo } from 'react';

interface Props {
  html: string;
  versei: BibleVersei;
  chapteri: BibleChapteri;
}

export const BibleVerseText = memo(function BibleVerseText({ html, versei, chapteri }: Props): JSX.Element {
  return (
    <div
      attr-chapteri={chapteri}
      attr-versei={versei}
    >
      <span className="color--7">{versei + 1 + '. '}</span>
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
});
