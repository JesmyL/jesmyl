import { useConfirm } from '#shared/ui/modal/confirm/useConfirm';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmComCommentAltKeyAtom } from '$cm/entities/com-comment/state/atoms';
import { cmComFavoriteComsAtom, cmComSelectedComwsAtom, cmComTopToolsAtom } from '$cm/entities/com/state/atoms';
import { indexUserAccessRightsAtom } from '$index/atoms';
import { authIDB } from '$index/db/auth-idb';
import { cmIDB } from 'front/apps/cm/07-shared/state/cmIDB';

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
          cmComSelectedComwsAtom.reset();
          cmComCommentAltKeyAtom.reset();
          cmComFavoriteComsAtom.reset();

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
