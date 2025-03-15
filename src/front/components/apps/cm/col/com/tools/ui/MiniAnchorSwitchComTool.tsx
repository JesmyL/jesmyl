import { cmIDB } from '$cm/_db/cm-idb';
import { ComTool } from '../ComTool';

export const MiniAnchorSwitchComTool = () => {
  const [isMiniAnchor, setIsMiniAnchor] = cmIDB.use.isMiniAnchor();

  return (
    <ComTool
      title={isMiniAnchor ? 'Раскрыть ссылки' : 'Свернуть ссылки'}
      icon={isMiniAnchor ? 'MinusSign' : 'Menu01'}
      onClick={() => setIsMiniAnchor(!isMiniAnchor)}
    />
  );
};
