import { BottomPopupItem } from '../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import { useConfirm } from '../../../../complect/modal/confirm/useConfirm';
import { IconUserStrokeRounded } from '../../../../complect/the-icon/icons/user';
import { useSetAuth } from '../../molecules';

export const UserMore = ({ onClose }: { onClose: (isOpen: false) => void }) => {
  const setAuth = useSetAuth();
  const [confirmNode, confirm] = useConfirm();

  return (
    <>
      <>{confirmNode}</>
      <BottomPopupItem
        title="Выйти из системы"
        Icon={IconUserStrokeRounded}
        onClick={async event => {
          event.preventDefault();
          event.stopPropagation();

          if (await confirm('Произвести выход из системы?', 'Разлогиниться')) {
            setAuth({ level: 0 });
            window.location.reload();
            onClose(false);
          }
        }}
      />
    </>
  );
};
