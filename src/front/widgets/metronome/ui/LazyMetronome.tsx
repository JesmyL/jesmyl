import { useSyncServerTimeStamp } from '#shared/lib/useSyncServerTimeStamp';
import { Modal, ModalBody } from '#shared/ui/modal';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComMetricNums } from 'shared/model/cm/com-metric-nums';
import { metronomeIsOpenAtom, metronomeUserBpmAtom, metronomeUserMeterSizeAtom } from '../lib/atoms';
import { useMetronomePlayStateController } from '../lib/useMetronomePlayStateController';
import { MetronomeBpmInput } from './BpmInput';
import { MetronomeMeterDots } from './MeterDots';
import { MetronomePlayButton } from './PlayButton';
import { MetronomeTouchBpmButton } from './TouchBpmButton';

interface Props {
  meterSize: CmComMetricNums | und;
  bpm?: number;
}

export default function LazyMetronome({ meterSize = 4, bpm = 120 }: Props) {
  const isOpen = useAtomValue(metronomeIsOpenAtom);

  useMetronomePlayStateController();
  useSyncServerTimeStamp();

  useEffect(() => metronomeUserMeterSizeAtom.set(meterSize), [meterSize]);
  useEffect(() => metronomeUserBpmAtom.set(bpm), [bpm]);

  return (
    <div hidden={!isOpen}>
      <Modal
        openAtom={metronomeIsOpenAtom}
        onClose={openAtom => openAtom.set(false)}
      >
        <ModalBody className="flex column between aspect-1/1">
          <div className="flex between w-full">
            <MetronomeTouchBpmButton />
            <MetronomeMeterDots />
          </div>
          <div className="flex w-full between">
            <MetronomeBpmInput />
            <MetronomePlayButton />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
