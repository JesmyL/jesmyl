import { cmComOrderClientInvocatorMethods } from 'front/components/apps/cm/cm-invocator-editor.methods';
import { BottomPopupItem } from '../../../../../../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import { IconLink02StrokeRounded } from '../../../../../../../../../complect/the-icon/icons/link-02';
import { OrdersRedactorOrderToolsProps } from '../OrdersRedactorOrderTools';

export const OrdersRedactorOrderToolsHiddenOnMin = (props: OrdersRedactorOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        Icon={IconLink02StrokeRounded}
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
