import { EditableComOrder } from '$cm+editor/basis/lib/EditableComOrder';

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
