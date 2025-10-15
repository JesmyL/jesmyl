import { CmComOrder, ICmComOrderProps } from '../../com-order';

export interface ICmComOrderLineProps extends ICmComOrderProps {
  textLine: string;
  textLinei: number;
  textLines: number;
  wordCount: number;
  words: string[];
  prevLinesCount?: number;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  setWordClass?: (props: ICmComOrderLineProps, wordi: number) => string;
}

export interface ICmComOrderLinePropsBag {
  ord: CmComOrder;
  linei: number;
  wordi: number;
  word: string;
  words: number;
  lines: number;
}
