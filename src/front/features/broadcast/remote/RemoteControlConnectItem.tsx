import { useTranslateRemote } from '#features/broadcast/remote/remote-locale';
import { RemoteControlConnectPopup } from '#features/broadcast/remote/RemoteControlConnectPopup';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { WithAtomTruthfulValue } from '#shared/ui/WithAtomTruthfulValue';
import { Atom, atom } from 'atomaric';
import { RemoteLocaleKey } from 'shared/model/+locale/_RemoteLocaleKey';

let isOpenAtom: Atom<boolean>;

export const RemoteControlConnectItem = () => {
  const tRemote = useTranslateRemote();

  isOpenAtom ??= atom(false);

  return (
    <>
      <BottomPopupItem
        icon="ComputerPhoneSync"
        title={tRemote(RemoteLocaleKey.ConnectToRemoteControl)}
        onClick={event => {
          event.stopPropagation();
          isOpenAtom.set(true);
        }}
      />

      <WithAtomTruthfulValue atom={isOpenAtom}>
        <RemoteControlConnectPopup onClose={isOpenAtom.reset} />
      </WithAtomTruthfulValue>
    </>
  );
};
