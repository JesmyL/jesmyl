import { Modal, ModalBody } from '#shared/ui/modal';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComMetricNums } from 'shared/model/cm/com-metric-nums';
import styled from 'styled-components';
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

  useEffect(() => metronomeUserMeterSizeAtom.set(meterSize), [meterSize]);
  useEffect(() => metronomeUserBpmAtom.set(bpm), [bpm]);

  return (
    <div hidden={!isOpen}>
      <Modal
        openAtom={metronomeIsOpenAtom}
        onClose={openAtom => openAtom.set(false)}
      >
        <StyledModalBody className="flex column between">
          <div className="flex between w-full">
            <MetronomeTouchBpmButton />
            <MetronomeMeterDots />
          </div>
          <div className="flex w-full between">
            <MetronomeBpmInput />
            <MetronomePlayButton />
          </div>
        </StyledModalBody>
      </Modal>
    </div>
  );
}

const StyledModalBody = styled(ModalBody)`
  aspect-ratio: 1 / 1;
  container: metronome / size;
`;
