import { DisabledArea } from '#shared/ui/DisabledArea';
import { useConfirm } from '#shared/ui/modal/confirm/useConfirm';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { twMerge } from 'tailwind-merge';
import { OrdersRedactorOrderToolsProps } from '../model';

export const OrdersRedactorOrderToolsAnchorDelete = ({ com, ord, onClose }: OrdersRedactorOrderToolsProps) => {
  const confirm = useConfirm();
  const ifAnchorSuffix = ord.isAnchor ? 'ссылку на ' : '';
  const isDisabled = ord.me.prev == null && ord.me.isNextInherit;

  return (
    <DisabledArea
      isDisabled={isDisabled}
      disabledReason="Следующий блок - продолжение"
      onClick={async () => {
        if (
          !(await confirm(
            <>
              {'Удалить '}
              <span className="text-x7">
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

        await cmEditComOrderClientTsjrpcMethods.remove({
          orderTitle: ord.me.header(),
          comw: com.wid,
          ordw: ord.wid,
          isAnchor: ord.isAnchor,
        });
        onClose(false);
      }}
    >
      {({ className, onClick }) => (
        <BottomPopupItem
          icon="Delete02"
          className={twMerge('text-xKO', className)}
          title={`Удалить ${ifAnchorSuffix} ${ord.me.header()}`}
          onClick={onClick}
        />
      )}
    </DisabledArea>
  );
};
