import { applicationLangi, translateBase, translateDynamic } from '#basis/locale';
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
        title={translateBase(it => it.showMyQr)}
        icon="QrCode"
        onClick={isOpenQrAtom.do.toggle}
      />
      <BottomPopupItem
        id="log-out-button"
        title={translateBase(it => it.logout)}
        icon="User"
        onClick={async () => {
          if (await confirm(translateBase(it => it.logout))) {
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

      <div className="flex justify-center mt-5 w-full">
        {translateDynamic(applicationLangi)(it => it.lang[applicationLangi])}
      </div>

      <QrCodeFullScreen
        openAtom={isOpenQrAtom}
        text={JSON.stringify(auth)}
      />
    </>
  );
};
