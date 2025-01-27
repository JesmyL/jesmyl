import { BottomPopupItem } from '../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import { useConfirm } from '../../../../complect/modal/confirm/useConfirm';
import { IconUserStrokeRounded } from '../../../../complect/the-icon/icons/user';
import { indexIDB } from '../../db/index-idb';

export const UserMore = ({ onClose }: { onClose: (isOpen: false) => void }) => {
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
            await indexIDB.remove.auth();
            localStorage.token = '';
            window.location.reload();
            onClose(false);
          }
        }}
      />
    </>
  );
};
