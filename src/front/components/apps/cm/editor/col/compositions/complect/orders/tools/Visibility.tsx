import { useConfirm } from 'front/complect/modal/confirm/useConfirm';
import { StyledLoadingSpinner } from 'front/complect/the-icon/IconLoading';
import { cmComOrderClientInvocatorMethods } from 'front/components/apps/cm/cm-invocator';
import { useState } from 'react';
import { BottomPopupItem } from '../../../../../../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import { IconViewStrokeRounded } from '../../../../../../../../../complect/the-icon/icons/view';
import { IconViewOffStrokeRounded } from '../../../../../../../../../complect/the-icon/icons/view-off';
import { OrdersRedactorOrderToolsProps } from '../OrdersRedactorOrderTools';

export const OrdersRedactorOrderToolsVisibility = ({ onClose, ord }: OrdersRedactorOrderToolsProps) => {
  const [confirmNode, confirm] = useConfirm();
  const [isLoading, setIsLoading] = useState(false);
  const Icon = isLoading ? StyledLoadingSpinner : ord.isVisible ? IconViewOffStrokeRounded : IconViewStrokeRounded;

  return (
    <>
      {confirmNode}
      <BottomPopupItem
        Icon={Icon}
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
