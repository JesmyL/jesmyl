import { cmComOrderClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { BottomPopupItem } from '../../../../../../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import { OrdersRedactorOrderToolsProps } from '../OrdersRedactorOrderTools';

export const OrdersRedactorOrderToolsEmptyHeader = (props: OrdersRedactorOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        icon="Message01"
        title={`${props.ord.isEmptyHeader ? 'Вернуть' : 'Убрать'} название блока`}
        onClick={async () => {
          await cmComOrderClientInvocatorMethods.toggleTitleVisibility(
            null,
            props.ord.me.header(),
            props.com.wid,
            props.ord.wid,
          );
          props.onClose(false);
        }}
      />
    </>
  );
};
