import { cmIDB } from '@cm/basis/lib/cmIdb';
import { ComTool } from '../ComTool';

export const OpenPlayerTool = () => {
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
