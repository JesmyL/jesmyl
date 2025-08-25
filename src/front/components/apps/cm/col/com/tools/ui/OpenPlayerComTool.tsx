import { cmPlayerHideModeAtom } from '$cm/basis/lib/store/atoms';
import { useAtom } from 'atomaric';
import { ComTool } from '../ComTool';

export const OpenPlayerComTool = () => {
  const [playerHideMode, setPlayerHideMode] = useAtom(cmPlayerHideModeAtom);

  return (
    <ComTool
      title="Проигрыватель"
      icon="PlayCircle"
      iconKind={playerHideMode ? 'SolidRounded' : 'StrokeRounded'}
      onClick={() => setPlayerHideMode(playerHideMode ? '' : 'min')}
    />
  );
};
