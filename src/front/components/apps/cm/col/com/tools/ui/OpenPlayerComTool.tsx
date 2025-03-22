import { cmIDB } from '$cm/basis/lib/cmIDB';
import { ComTool } from '../ComTool';

export const OpenPlayerComTool = () => {
  const [playerHideMode, setPlayerHideMode] = cmIDB.use.playerHideMode();

  return (
    <ComTool
      title="Проигрыватель"
      icon="PlayCircle"
      iconKind={playerHideMode ? 'SolidRounded' : 'StrokeRounded'}
      onClick={() => setPlayerHideMode(playerHideMode ? '' : 'min')}
    />
  );
};
