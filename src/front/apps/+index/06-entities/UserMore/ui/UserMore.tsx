import { useConfirm } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmOnUserLogout } from '$cm/ext';
import { authIDB, indexUserAccessRightsAtom } from '$index/shared/state';

export const IndexUserMore = ({ onClose }: { onClose: (isOpen: false) => void }) => {
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

          indexUserAccessRightsAtom.reset();

          cmOnUserLogout();

          window.location.reload();
          onClose(false);
        }
      }}
    />
  );
};
