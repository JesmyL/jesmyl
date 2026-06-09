import { EditableComOrder } from '../classes/EditableComOrder';

export interface IEditableComLineProps {
  line: string;
  linei: number;
  linesLen: number;
  wordCount: number;
  words: string[];
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  wordi: number;
  ord: EditableComOrder;
}
