import { cmIDB } from 'front/components/apps/cm/_db/cm-idb';
import { IconMenu01StrokeRounded } from '../../../../../../../complect/the-icon/icons/menu-01';
import { IconMinusSignStrokeRounded } from '../../../../../../../complect/the-icon/icons/minus-sign';
import { ComTool } from '../ComTool';

export const MiniAnchorSwitchTool = () => {
  const [isMiniAnchor, setIsMiniAnchor] = cmIDB.use.isMiniAnchor();

  return (
    <ComTool
      title={isMiniAnchor ? 'Раскрыть ссылки' : 'Свернуть ссылки'}
      Icon={isMiniAnchor ? IconMinusSignStrokeRounded : IconMenu01StrokeRounded}
      onClick={() => setIsMiniAnchor(!isMiniAnchor)}
    />
  );
};
