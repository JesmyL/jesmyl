import { useConfirm } from 'front/complect/modal/confirm/useConfirm';
import { StyledLoadingSpinner } from 'front/complect/the-icon/IconLoading';
import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { cmComOrderClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { useState } from 'react';
import { BottomPopupItem } from '../../../../../../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import { OrdersRedactorOrderToolsProps } from '../OrdersRedactorOrderTools';

export const OrdersRedactorOrderToolsVisibility = ({ onClose, ord }: OrdersRedactorOrderToolsProps) => {
  const [confirmNode, confirm] = useConfirm();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {confirmNode}
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
            await cmComOrderClientInvocatorMethods.toggleVisibility(null, ord.wid, ord.me.header(), ord.com.wid);
            setIsLoading(false);
          }

          onClose(false);
        }}
      />
    </>
  );
};
