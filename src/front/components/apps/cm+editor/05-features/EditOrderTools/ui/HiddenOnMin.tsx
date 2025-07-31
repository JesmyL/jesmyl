import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { OrdersRedactorOrderToolsProps } from '../model';

export const OrdersRedactorOrderToolsHiddenOnMin = (props: OrdersRedactorOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        icon="Link02"
        title={`${props.ord.isOpened ? 'Скрывать' : 'Показывать'} в свёрнутом режиме`}
        onClick={async () => {
          await cmEditComOrderClientTsjrpcMethods.toggleVisibilityInMiniMode({
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
