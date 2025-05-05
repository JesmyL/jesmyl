import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { useAtomSet, useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import styled from 'styled-components';
import { metronomeIsOpenAtom, metronomeUserBpmAtom, metronomeUserMeterSizeAtom } from '../lib/atoms';
import { useMetronomePlayStateController } from '../lib/useMetronomePlayStateController';
import { MetronomeBpmInput } from './BpmInput';
import { MetronomeMeterDots } from './MeterDots';
import { MetronomePlayButton } from './PlayButton';
import { MetronomeTouchBpmButton } from './TouchBpmButton';

interface Props {
  meterSize: 3 | 4 | und;
  bpm?: number;
}

export default function LazyMetronome({ meterSize = 4, bpm = 120 }: Props) {
  const setUserBpm = useAtomSet(metronomeUserBpmAtom);
  const setUserMeterSize = useAtomSet(metronomeUserMeterSizeAtom);
  const isOpen = useAtomValue(metronomeIsOpenAtom);

  useMetronomePlayStateController();

  useEffect(() => setUserMeterSize(meterSize), [meterSize, setUserMeterSize]);
  useEffect(() => setUserBpm(bpm), [bpm, setUserBpm]);

  return (
    isOpen && (
      <Modal openAtom={metronomeIsOpenAtom}>
        <StyledModalBody className="flex column between">
          <div className="flex between full-width">
            <MetronomeTouchBpmButton />
            <MetronomeMeterDots />
          </div>
          <div className="flex full-width between">
            <MetronomeBpmInput />
            <MetronomePlayButton />
          </div>
        </StyledModalBody>
      </Modal>
    )
  );
}

const StyledModalBody = styled(ModalBody)`
  aspect-ratio: 1 / 1;
  container: metronome / size;
`;
