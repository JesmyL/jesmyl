import { Button } from '#shared/components/ui/button';
import { QrReader } from '#shared/ui/qr-code/QrReader';
import { atom } from 'atomaric';
import { MetronomeLeaderSyncParams } from '../model/model';
import { metronomeJoinedToLeaderAtom, metronomeLeaderTimeStampDictAtom } from '../state/atoms';

const openAtom = atom(false);
const timeStampListAtom = atom((): Map<string, { data: string; now: number }> => new Map());

export const MetronomeReaderQr = () => {
  return (
    <>
      <Button
        icon="QrCode01"
        onClick={openAtom.do.toggle}
      >
        Присоединиться по QR
      </Button>

      <QrReader
        openAtom={openAtom}
        onReadData={data => {
          const props: MetronomeLeaderSyncParams = JSON.parse(data);

          if (!props.n || props.ts == null) return metronomeLeaderTimeStampDictAtom.reset();

          metronomeLeaderTimeStampDictAtom.do.setPartial({ [props.n]: +props.ts });
          metronomeJoinedToLeaderAtom.set(props.n);
          timeStampListAtom.reset();
          openAtom.reset();
        }}
      />
    </>
  );
};
