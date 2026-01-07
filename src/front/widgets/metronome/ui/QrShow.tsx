import { Button } from '#shared/components/ui/button';
import { myTimeStampAtom } from '#shared/state/atoms';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { makeToastKOMoodConfig, usePrompt } from '#shared/ui/modal';
import { QRCode } from '#shared/ui/qr-code/QRCode';
import { atom, useAtomValue } from 'atomaric';
import { makeRegExp } from 'regexpert';
import { toast } from 'sonner';
import { MetronomeLeaderSyncParams } from '../model/model';
import {
  metronomeIsSyncWithGroupAtom,
  metronomeJoinedToLeaderAtom,
  metronomeLeaderTimeStampDictAtom,
  metronomeMyNameAtom,
} from '../state/atoms';

const openQrAtom = atom(false);

export const MetronomeQrShow = () => {
  const joinedToLeaderName = useAtomValue(metronomeJoinedToLeaderAtom);
  const leaderConfig = useAtomValue(metronomeLeaderTimeStampDictAtom)[joinedToLeaderName];
  const prompt = usePrompt();
  const isSyncWithGroup = useAtomValue(metronomeIsSyncWithGroupAtom);
  const myName = useAtomValue(metronomeMyNameAtom);

  return (
    <>
      <Button
        icon="QrCode"
        disabled={!isSyncWithGroup || !!leaderConfig}
        onClick={async () => {
          if (!myName) {
            const minLength = 3;
            const maxLength = 10;
            const name = await prompt(
              <>
                Имя должно быть от {minLength} до {maxLength} знаков, и содержать только цифры, буквы кирилицы, латиницы
              </>,
              'Представься',
            );

            if (!name || makeRegExp(`/^[a-zа-яё0-9]{${minLength},${maxLength}}$/`).test(name)) {
              toast('Имя не подходит', makeToastKOMoodConfig());
              return;
            }

            metronomeMyNameAtom.set(name);
          }

          openQrAtom.do.toggle();
        }}
      >
        Добавить в мою группу
      </Button>

      <FullContent
        containerClassName="p-0 flex overflow-hidden"
        openAtom={openQrAtom}
      >
        <QRCode
          text={JSON.stringify(((): MetronomeLeaderSyncParams => ({ n: myName, ts: myTimeStampAtom.get() }))())}
          className="w-[100vmin]! h-[100vmin]! scale-[1.2]!"
        />
      </FullContent>
    </>
  );
};
