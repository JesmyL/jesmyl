import { EditableCom } from '../../com/EditableCom';
import { EditableOrder } from './EditableOrder';
import { CmComOrderOnClickBetweenData } from './model';
import { OrdersRedactorOrderToolsAnchor } from './tools/Anchor';
import { OrdersRedactorOrderToolsAnchorDelete } from './tools/AnchorDelete';
import { OrdersRedactorOrderToolsBlockType } from './tools/BlockType';
import { OrdersRedactorOrderToolsChangeText } from './tools/ChangeText';
import { OrdersRedactorOrderToolsChordBind } from './tools/ChordBind';
import { OrdersRedactorOrderToolsEmptyHeader } from './tools/EmptyHeader';
import { OrdersRedactorOrderToolsHiddenOnMin } from './tools/HiddenOnMin';
import { OrdersRedactorOrderToolsModulation } from './tools/Modulation';
import { OrdersRedactorOrderToolsMoveBlock } from './tools/MoveBlock';
import { OrdersRedactorOrderToolsVisibility } from './tools/Visibility';

export interface OrdersRedactorOrderToolsProps {
  com: EditableCom;
  ord: EditableOrder;
  ordi: number;
  onClose: (isOpen: false) => void;
  setClickBetweenOrds: (clickBetweenData: CmComOrderOnClickBetweenData) => void;
}

export const OrdersRedactorOrderTools = (props: OrdersRedactorOrderToolsProps) => {
  return (
    <>
      <OrdersRedactorOrderToolsBlockType {...props} />
      <OrdersRedactorOrderToolsChordBind {...props} />
      {!props.ord.isAnchor ? (
        <>
          {props.ord.texti == null || <OrdersRedactorOrderToolsChangeText {...props} />}
          {props.ord.me.isInherit || <OrdersRedactorOrderToolsAnchor {...props} />}
        </>
      ) : (
        <>
          <OrdersRedactorOrderToolsHiddenOnMin {...props} />
        </>
      )}
      <OrdersRedactorOrderToolsVisibility {...props} />
      {props.ord.me.style?.isModulation && <OrdersRedactorOrderToolsModulation {...props} />}

      <OrdersRedactorOrderToolsEmptyHeader {...props} />
      <OrdersRedactorOrderToolsMoveBlock {...props} />
      <OrdersRedactorOrderToolsAnchorDelete {...props} />
    </>
  );
};
