import { BottomPopupItem } from '#shared/ui/absolute-popup/bottom-popup/BottomPopupItem';
import { cmComOrderClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { useConfirm } from '../../../../../../../../../shared/ui/modal/hooks/useConfirm';
import { OrdersRedactorOrderToolsProps } from '../OrdersRedactorOrderTools';

export const OrdersRedactorOrderToolsAnchorDelete = ({ com, ord, onClose }: OrdersRedactorOrderToolsProps) => {
  const [confirmNode, confirm] = useConfirm();
  const ifAnchorSuffix = ord.isAnchor ? 'ссылку на ' : '';

  return (
    <>
      {confirmNode}
      <BottomPopupItem
        icon="Delete02"
        className="color--ko"
        title={`Удалить ${ifAnchorSuffix} ${ord.me.header()}`}
        onClick={async () => {
          if (
            !(await confirm(
              <>
                {'Удалить '}
                <span className="color--7">
                  {ifAnchorSuffix}
                  {ord.me.header()}
                </span>
                ?
                {ord.top.p?.flat().length
                  ? ' Данное действие повлечёт за собой уничтожение аппликатуры в данном блоке.'
                  : ''}
              </>,
            ))
          )
            return;

          await cmComOrderClientInvocatorMethods.remove(null, ord.me.header(), com.wid, ord.wid, ord.isAnchor);
          onClose(false);
        }}
      />
    </>
  );
};
