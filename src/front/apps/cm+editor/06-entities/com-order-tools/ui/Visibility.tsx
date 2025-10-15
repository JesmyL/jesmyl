import { useConfirm } from '#shared/ui/modal/confirm/useConfirm';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { StyledLoadingSpinner } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useState } from 'react';
import { CmEditorComOrderToolsProps } from '../model';

export const CmEditorComOrderToolsOrderVisibility = ({ onClose, ord }: CmEditorComOrderToolsProps) => {
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
          await cmEditComOrderClientTsjrpcMethods.toggleVisibility({
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
