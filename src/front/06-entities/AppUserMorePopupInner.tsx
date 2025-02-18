import { authIDB } from '#basis/lib/idb/auth';
import { BottomPopupItem } from '#shared/ui/absolute-popup/bottom-popup/BottomPopupItem';
import { useConfirm } from '#shared/ui/modal';

export const AppUserMorePopupInner = ({ onClose }: { onClose: (isOpen: false) => void }) => {
  const [confirmNode, confirm] = useConfirm();

  return (
    <>
      <>{confirmNode}</>
      <BottomPopupItem
        id="log-out-button"
        title="Выйти из системы"
        icon="User"
        onClick={async event => {
          event.preventDefault();
          event.stopPropagation();

          if (!(await confirm('Произвести выход из системы?', 'Разлогиниться'))) return;

          await authIDB.remove.auth();
          await authIDB.remove.token();
          window.location.reload();
          onClose(false);
        }}
      />
    </>
  );
};
