import { cmComPlayerHideModeAtom } from '$cm/entities/index';
import { useAtom } from 'atomaric';
import { CmComTool } from '../ComTool';

export const CmComToolOpenPlayer = () => {
  const [playerHideMode, setPlayerHideMode] = useAtom(cmComPlayerHideModeAtom);

  return (
    <CmComTool
      title="Проигрыватель"
      icon="PlayCircle"
      iconKind={playerHideMode ? 'SolidRounded' : 'StrokeRounded'}
      onClick={() => setPlayerHideMode(playerHideMode ? '' : 'min')}
    />
  );
};
