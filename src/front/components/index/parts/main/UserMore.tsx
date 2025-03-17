import { useConfirm } from '#shared/ui/modal/confirm/useConfirm';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { authIDB } from '$index/db/auth-idb';

export const UserMore = ({ onClose }: { onClose: (isOpen: false) => void }) => {
  const confirm = useConfirm();

  return (
    <BottomPopupItem
      id="log-out-button"
      title="Выйти из системы"
      icon="User"
      onClick={async () => {
        if (await confirm('Произвести выход из системы?', 'Разлогиниться')) {
          await authIDB.remove.auth();
          await authIDB.remove.token();
          window.location.reload();
          onClose(false);
        }
      }}
    />
  );
};
