import { cmIDB } from 'front/components/apps/cm/_db/cm-idb';
import { ComTool } from '../ComTool';

export const MiniAnchorSwitchTool = () => {
  const [isMiniAnchor, setIsMiniAnchor] = cmIDB.use.isMiniAnchor();

  return (
    <ComTool
      title={isMiniAnchor ? 'Раскрыть ссылки' : 'Свернуть ссылки'}
      icon={isMiniAnchor ? 'MinusSign' : 'Menu01'}
      onClick={() => setIsMiniAnchor(!isMiniAnchor)}
    />
  );
};
