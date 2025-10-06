import { useConfirm } from '#shared/ui/modal/confirm/useConfirm';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import {
  cmComCommentAltKeyAtom,
  cmComTopToolsAtom,
  cmFavoriteComsAtom,
  cmSelectedComwsAtom,
} from '$cm/basis/lib/store/atoms';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { indexUserAccessRightsAtom } from '$index/atoms';
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

          indexUserAccessRightsAtom.reset();

          cmComTopToolsAtom.reset();
          cmSelectedComwsAtom.reset();
          cmComCommentAltKeyAtom.reset();
          cmFavoriteComsAtom.reset();

          cmIDB.tb.comCommentBlocks.clear();
          cmIDB.tb.localComCommentBlocks.clear();
          cmIDB.set.lastModifiedAt(0);

          window.location.reload();
          onClose(false);
        }
      }}
    />
  );
};
