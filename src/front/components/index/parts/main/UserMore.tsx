import { BottomPopupItem } from '../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import { useConfirm } from '../../../../complect/modal/confirm/useConfirm';
import { IconUserStrokeRounded } from '../../../../complect/the-icon/icons/user';
import { authIDB } from '../../db/auth-idb';

export const UserMore = ({ onClose }: { onClose: (isOpen: false) => void }) => {
  const [confirmNode, confirm] = useConfirm();

  return (
    <>
      <>{confirmNode}</>
      <BottomPopupItem
        id="log-out-button"
        title="Выйти из системы"
        Icon={IconUserStrokeRounded}
        onClick={async event => {
          event.preventDefault();
          event.stopPropagation();

          if (await confirm('Произвести выход из системы?', 'Разлогиниться')) {
            await authIDB.remove.auth();
            await authIDB.remove.token();
            window.location.reload();
            onClose(false);
          }
        }}
      />
    </>
  );
};
