import { CmComOrder, ICmComOrderProps } from '../../com-order';

export interface ICmComOrderLineAsComponentProps extends ICmComOrderProps {
  textLine: string;
  textLinei: number;
  textLines: number;
  solidTextLinei: number;
  wordCount: number;
  words: string[];
  prevLinesCount?: number;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  setWordClass?: (props: ICmComOrderLineAsComponentProps, wordi: number) => string;
  chordHardLevel: 1 | 2 | 3;
}

export interface ICmComOrderLinePropsBag {
  ord: CmComOrder;
  linei: number;
  wordi: number;
  word: string;
  words: number;
  lines: number;
}
