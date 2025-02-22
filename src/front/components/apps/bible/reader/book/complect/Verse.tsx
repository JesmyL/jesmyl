import { BibleChapteri, BibleVersei } from '@bible/model';
import { memo } from 'react';

interface Props {
  html: string;
  versei: BibleVersei;
  chapteri: BibleChapteri;
}

export default memo(function BibleReaderVerseText({ html, versei, chapteri }: Props): JSX.Element {
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
