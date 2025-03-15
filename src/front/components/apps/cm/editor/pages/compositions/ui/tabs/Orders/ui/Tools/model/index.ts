import { EditableCom } from '$cm/editor/lib/EditableCom';
import { EditableComOrder } from '$cm/editor/lib/EditableComOrder';
import { CmComOrderOnClickBetweenData } from '../../../model';

export interface OrdersRedactorOrderToolsProps {
  com: EditableCom;
  ord: EditableComOrder;
  ordi: number;
  onClose: (isOpen: false) => void;
  setClickBetweenOrds: (clickBetweenData: CmComOrderOnClickBetweenData) => void;
}
