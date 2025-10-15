import { EditableComOrder } from '../classes/EditableComOrder';

export interface IEditableComLineProps {
  textLine: string;
  textLinei: number;
  textLines: number;
  wordCount: number;
  words: string[];
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  wordi: number;
  orderUnit: EditableComOrder;
}
