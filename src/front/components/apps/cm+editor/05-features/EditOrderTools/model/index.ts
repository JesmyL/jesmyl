import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { EditableComOrder } from '$cm+editor/basis/lib/EditableComOrder';
import { CmComOrderOnClickBetweenData } from '$cm+editor/basis/model/Orders';

export interface OrdersRedactorOrderToolsProps {
  com: EditableCom;
  ord: EditableComOrder;
  ordi: number;
  onClose: (isOpen: false) => void;
  setClickBetweenOrds: (clickBetweenData: CmComOrderOnClickBetweenData) => void;
}
