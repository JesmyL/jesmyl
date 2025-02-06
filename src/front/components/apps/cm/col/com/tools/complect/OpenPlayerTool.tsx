import { cmIDB } from 'front/components/apps/cm/_db/cm-idb';
import {
  IconVynil03SolidRounded,
  IconVynil03StrokeRounded,
} from '../../../../../../../complect/the-icon/icons/vynil-03';
import { ComTool } from '../ComTool';

export const OpenPlayerTool = () => {
  const [playerHideMode, setPlayerHideMode] = cmIDB.use.playerHideMode();

  return (
    <ComTool
      title="Проигрыватель"
      Icon={playerHideMode ? IconVynil03SolidRounded : IconVynil03StrokeRounded}
      onClick={() => setPlayerHideMode(playerHideMode ? '' : 'min')}
    />
  );
};
