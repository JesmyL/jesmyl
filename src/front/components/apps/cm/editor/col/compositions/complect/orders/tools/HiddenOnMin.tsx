import { BottomPopupItem } from '#shared/ui/absolute-popup/bottom-popup/BottomPopupItem';
import { cmComOrderClientInvocatorMethods } from '@cm/editor/cm-editor-invocator.methods';
import { OrdersRedactorOrderToolsProps } from '../OrdersRedactorOrderTools';

export const OrdersRedactorOrderToolsHiddenOnMin = (props: OrdersRedactorOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        icon="Link02"
        title={`${props.ord.isOpened ? 'Скрывать' : 'Показывать'} в свёрнутом режиме`}
        onClick={async () => {
          await cmComOrderClientInvocatorMethods.toggleVisibilityInMiniMode(
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
