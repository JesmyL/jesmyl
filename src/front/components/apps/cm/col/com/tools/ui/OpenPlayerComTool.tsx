import { cmIDB } from '$cm/_db/cm-idb';
import { ComTool } from '../ComTool';

export const OpenPlayerComTool = () => {
  const [playerHideMode, setPlayerHideMode] = cmIDB.use.playerHideMode();

  return (
    <ComTool
      title="Проигрыватель"
      icon="Vynil03"
      iconKind={playerHideMode ? 'SolidRounded' : 'StrokeRounded'}
      onClick={() => setPlayerHideMode(playerHideMode ? '' : 'min')}
    />
  );
};
