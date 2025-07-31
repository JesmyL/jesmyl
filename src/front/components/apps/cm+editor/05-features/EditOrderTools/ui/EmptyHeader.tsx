import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { OrdersRedactorOrderToolsProps } from '../model';

export const OrdersRedactorOrderToolsEmptyHeader = (props: OrdersRedactorOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        icon="Message01"
        title={`${props.ord.isEmptyHeader ? 'Вернуть' : 'Убрать'} название блока`}
        onClick={async () => {
          await cmEditComOrderClientTsjrpcMethods.toggleTitleVisibility({
            orderTitle: props.ord.me.header(),
            comw: props.com.wid,
            ordw: props.ord.wid,
          });
          props.onClose(false);
        }}
      />
    </>
  );
};
