import { cmIsComMiniAnchorAtom } from '$cm/atoms';
import { useAtom } from 'atomaric';
import { ComTool } from '../ComTool';

export const MiniAnchorSwitchComTool = () => {
  const [isMiniAnchor, setIsMiniAnchor] = useAtom(cmIsComMiniAnchorAtom);

  return (
    <ComTool
      title={isMiniAnchor ? 'Раскрыть ссылки' : 'Свернуть ссылки'}
      icon={isMiniAnchor ? 'MinusSign' : 'Menu01'}
      onClick={() => setIsMiniAnchor(!isMiniAnchor)}
    />
  );
};
