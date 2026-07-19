import { ICmComOrderProps } from '#shared/model/cm/order/regions';
import { CmComLinei } from 'shared/api';
import { CmComOrder } from 'shared/const/cm/order/Order';

export interface ICmComOrderLineAsComponentProps extends ICmComOrderProps {
  line: string;
  linei: CmComLinei;
  linesLen: number;
  solidLinei: CmComLinei;
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
