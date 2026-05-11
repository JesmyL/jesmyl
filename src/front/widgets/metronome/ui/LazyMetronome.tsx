import { Modal, ModalBody } from '#shared/ui/modal';
import { useAtomValue } from 'atomaric';
import { metronomeIsOpenAtom } from '../lib/atoms';
import { useMetronomePlayStateController } from '../lib/useMetronomePlayStateController';
import { MetronomeBpmInput } from './BpmInput';
import { MetronomeMeterDots } from './MeterDots';
import { MetronomePlayButton } from './PlayButton';
import { MetronomeTouchBpmButton } from './TouchBpmButton';

export default function LazyMetronome() {
  const isOpen = useAtomValue(metronomeIsOpenAtom);

  useMetronomePlayStateController();

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
