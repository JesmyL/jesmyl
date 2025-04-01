import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmComOrderClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { OrdersRedactorOrderToolsProps } from '../model';

export const OrdersRedactorOrderToolsEmptyHeader = (props: OrdersRedactorOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        icon="Message01"
        title={`${props.ord.isEmptyHeader ? 'Вернуть' : 'Убрать'} название блока`}
        onClick={async () => {
          await cmComOrderClientInvocatorMethods.toggleTitleVisibility({
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
