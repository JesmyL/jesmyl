import { WithAtomValue } from '#shared/ui/WithAtomValue';
import { cmComIsAudioPlayerHiddenAtom } from '$cm/entities/index';
import { CmComTool } from '../ComTool';

export const CmComToolOpenPlayer = () => {
  return (
    <WithAtomValue atom={cmComIsAudioPlayerHiddenAtom}>
      {isHidden => (
        <CmComTool
          title="Проигрыватель"
          icon="PlayCircle"
          iconKind={isHidden ? 'StrokeRounded' : 'SolidRounded'}
          onClick={cmComIsAudioPlayerHiddenAtom.do.toggle}
        />
      )}
    </WithAtomValue>
  );
};
