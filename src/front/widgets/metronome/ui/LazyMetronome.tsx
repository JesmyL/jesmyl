import { useAtom, useAtomSet } from '#shared/lib/atoms';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { useEffect } from 'react';
import { itNIt } from 'shared/utils';
import styled from 'styled-components';
import { metronomeIsOpenAtom, metronomeUserBpmAtom, metronomeUserMeterSizeAtom } from '../lib/atoms';
import { useMetronomePlayStateController } from '../lib/useMetronomePlayStateController';
import { MetronomeBpmInput } from './BpmInput';
import { MetronomeMeterDots } from './MeterDots';
import { MetronomePlayButton } from './PlayButton';
import { MetronomeTouctBpmButton } from './TouctBpmButton';

interface Props {
  meterSize: 3 | 4 | und;
  bpm?: number;
}

export default function LazyMetronome({ meterSize = 4, bpm = 120 }: Props) {
  const setUserBpm = useAtomSet(metronomeUserBpmAtom);
  const setUserMeterSize = useAtomSet(metronomeUserMeterSizeAtom);
  const [isOpen, setIsOpen] = useAtom(metronomeIsOpenAtom);

  useMetronomePlayStateController();

  useEffect(() => setUserMeterSize(meterSize), [meterSize, setUserMeterSize]);
  useEffect(() => setUserBpm(bpm), [bpm, setUserBpm]);

  return (
    isOpen && (
      <Modal onClose={() => setIsOpen(itNIt)}>
        <StyledModalBody className="flex column between">
          <div className="flex between full-width">
            <MetronomeTouctBpmButton />
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
