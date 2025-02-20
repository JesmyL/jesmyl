import { cmIDB } from '@cm/basis/lib/cmIdb';
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
