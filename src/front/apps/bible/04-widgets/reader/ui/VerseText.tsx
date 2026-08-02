import { BibleChapteri, BibleVersei } from '$bible/shared/model/base';
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
      attr-versen={versei + 1}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});
