import { EditableCom, EditableComOrder } from '@cm/editor/pages/compositions';
import { CmComOrderOnClickBetweenData } from '../../../model';

export interface OrdersRedactorOrderToolsProps {
  com: EditableCom;
  ord: EditableComOrder;
  ordi: number;
  onClose: (isOpen: false) => void;
  setClickBetweenOrds: (clickBetweenData: CmComOrderOnClickBetweenData) => void;
}
