import { useConfirm } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { cmOnUserLogout } from '$cm/ext';
import { authIDB, indexIDB, indexUserAccessRightsAtom, useAuth } from '$index/shared/state';
import { Atom, atom } from 'atomaric';

let isOpenQrAtom: Atom<boolean>;

export const IndexUserMore = ({ onClose }: { onClose: (isOpen: false) => void }) => {
  isOpenQrAtom ??= atom(false);

  const confirm = useConfirm();
  const auth = useAuth();

  return (
    <>
      <BottomPopupItem
        id="log-out-button"
        title="Показать мой QR"
        icon="QrCode"
        onClick={isOpenQrAtom.do.toggle}
      />
      <BottomPopupItem
        id="log-out-button"
        title="Выйти из системы"
        icon="User"
        onClick={async () => {
          if (await confirm('Произвести выход из системы?', 'Разлогиниться')) {
            await authIDB.remove.auth();
            await authIDB.remove.token();
            await indexIDB.resetLastModifiedAt();

            indexUserAccessRightsAtom.reset();

            cmOnUserLogout();

            window.location.reload();
            onClose(false);
          }
        }}
      />

      <QrCodeFullScreen
        openAtom={isOpenQrAtom}
        text={JSON.stringify(auth)}
      />
    </>
  );
};
