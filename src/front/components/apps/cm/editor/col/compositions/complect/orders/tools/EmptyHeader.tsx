import { cmComOrderClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { BottomPopupItem } from '../../../../../../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import { IconMessage01StrokeRounded } from '../../../../../../../../../complect/the-icon/icons/message-01';
import { OrdersRedactorOrderToolsProps } from '../OrdersRedactorOrderTools';

export const OrdersRedactorOrderToolsEmptyHeader = (props: OrdersRedactorOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        Icon={IconMessage01StrokeRounded}
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
