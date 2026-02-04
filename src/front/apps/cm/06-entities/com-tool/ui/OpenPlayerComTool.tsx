import { cmComIsAudioPlayerHiddenAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { CmComTool } from '../ComTool';

export const CmComToolOpenPlayer = () => {
  const isHidden = useAtomValue(cmComIsAudioPlayerHiddenAtom);

  return (
    <CmComTool
      title="Проигрыватель"
      icon="PlayCircle"
      iconKind={isHidden ? undefined : 'SolidRounded'}
      onClick={cmComIsAudioPlayerHiddenAtom.do.toggle}
    />
  );
};
