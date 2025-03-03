import { OrdersRedactorOrderToolsProps } from '../model';
import { OrdersRedactorOrderToolsAnchor } from './Anchor';
import { OrdersRedactorOrderToolsAnchorDelete } from './AnchorDelete';
import { OrdersRedactorOrderToolsBlockType } from './BlockType';
import { OrdersRedactorOrderToolsChangeText } from './ChangeText';
import { OrdersRedactorOrderToolsChordBind } from './ChordBind';
import { OrdersRedactorOrderToolsEmptyHeader } from './EmptyHeader';
import { OrdersRedactorOrderToolsHiddenOnMin } from './HiddenOnMin';
import { OrdersRedactorOrderToolsModulation } from './Modulation';
import { OrdersRedactorOrderToolsMoveBlock } from './MoveBlock';
import { OrdersRedactorOrderToolsVisibility } from './Visibility';

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
