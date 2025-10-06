import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';
import { OrdersRedactorOrderToolsProps } from './model';
import { OrdersRedactorOrderToolsAnchor } from './ui/Anchor';
import { OrdersRedactorOrderToolsAnchorDelete } from './ui/AnchorDelete';
import { OrdersRedactorOrderToolsBlockType } from './ui/BlockType';
import { OrdersRedactorOrderToolsChangeText } from './ui/ChangeText';
import { OrdersRedactorOrderToolsChordBind } from './ui/ChordBind';
import { OrdersRedactorOrderToolsEmptyHeader } from './ui/EmptyHeader';
import { OrdersRedactorOrderToolsHiddenOnMin } from './ui/HiddenOnMin';
import { OrdersRedactorOrderToolsModulation } from './ui/Modulation';
import { OrdersRedactorOrderToolsMoveBlock } from './ui/MoveBlock';
import { OrdersRedactorOrderToolsVisibility } from './ui/Visibility';

export const OrdersRedactorOrderTools = (props: OrdersRedactorOrderToolsProps) => {
  const checkAccess = useCheckUserAccessRightsInScope();

  return (
    <>
      <OrdersRedactorOrderToolsBlockType {...props} />
      <OrdersRedactorOrderToolsChordBind {...props} />
      {!props.ord.isAnchor ? (
        <>
          {props.ord.texti == null || <OrdersRedactorOrderToolsChangeText {...props} />}
          {checkAccess('cm', 'COM_ORD', 'C') &&
            (props.ord.me.isInherit || <OrdersRedactorOrderToolsAnchor {...props} />)}
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
      {checkAccess('cm', 'COM_ORD', 'D') && <OrdersRedactorOrderToolsAnchorDelete {...props} />}
    </>
  );
};
