import { cmComIsComMiniAnchorAtom } from '$cm/entities/index';
import { useAtom } from 'atomaric';
import { CmComTool } from '../ComTool';

export const CmComToolMiniAnchorSwitch = () => {
  const [isMiniAnchor, setIsMiniAnchor] = useAtom(cmComIsComMiniAnchorAtom);

  return (
    <CmComTool
      title={isMiniAnchor ? 'Раскрыть ссылки' : 'Свернуть ссылки'}
      icon={isMiniAnchor ? 'MinusSign' : 'Menu01'}
      onClick={() => setIsMiniAnchor(!isMiniAnchor)}
    />
  );
};
