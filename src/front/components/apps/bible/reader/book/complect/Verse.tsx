import { BibleChapteri, BibleVersei } from '@bible/model';
import { JSX, memo } from 'react';

interface Props {
  html: string;
  versei: BibleVersei;
  chapteri: BibleChapteri;
}

export const BibleReaderVerseText = memo(function BibleReaderVerseText({ html, versei, chapteri }: Props): JSX.Element {
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
