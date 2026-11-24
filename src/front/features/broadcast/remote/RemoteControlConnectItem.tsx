import { useTranslateRemote } from '#features/broadcast/remote/remote-locale';
import { RemoteControlConnectPopup } from '#features/broadcast/remote/RemoteControlConnectPopup';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { WithAtomTruthfulValue } from '#shared/ui/WithAtomTruthfulValue';
import { Atom, atom } from 'atomaric';
import { ScheduleWidgetWid } from 'shared/api';
import { RemoteLocaleKey } from 'shared/model/+locale/_RemoteLocaleKey';

let isOpenAtom: Atom<boolean>;

export const RemoteControlConnectItem = ({ schw }: { schw: ScheduleWidgetWid | nil }) => {
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
        <RemoteControlConnectPopup
          onClose={isOpenAtom.reset}
          schw={schw}
        />
      </WithAtomTruthfulValue>
    </>
  );
};
