import { useConfirm } from '#shared/ui/modal/confirm/useConfirm';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { StyledLoadingSpinner } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmEditComOrderClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { useState } from 'react';
import { OrdersRedactorOrderToolsProps } from '../model';

export const OrdersRedactorOrderToolsVisibility = ({ onClose, ord }: OrdersRedactorOrderToolsProps) => {
  const confirm = useConfirm();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <BottomPopupItem
      iconNode={
        isLoading ? (
          <StyledLoadingSpinner icon="Loading03" />
        ) : ord.isVisible ? (
          <LazyIcon icon="ViewOff" />
        ) : (
          <LazyIcon icon="View" />
        )
      }
      title={ord.isVisible ? 'Скрыть блок' : 'Показать блок'}
      onClick={async () => {
        if (await confirm(`Скрыть блок ${ord.me.header()}?`)) {
          setIsLoading(true);
          await cmEditComOrderClientInvocatorMethods.toggleVisibility({
            ordw: ord.wid,
            orderTitle: ord.me.header(),
            comw: ord.com.wid,
          });
          setIsLoading(false);
        }

        onClose(false);
      }}
    />
  );
};
