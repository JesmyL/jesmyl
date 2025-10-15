import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { EditableComOrder } from '$cm+editor/shared/classes/EditableComOrder';
import { CmComOrderOnClickBetweenData } from '$cm+editor/shared/model/Orders';

export interface CmEditorComOrderToolsProps {
  com: EditableCom;
  ord: EditableComOrder;
  ordi: number;
  onClose: (isOpen: false) => void;
  setClickBetweenOrds: (clickBetweenData: CmComOrderOnClickBetweenData) => void;
}
