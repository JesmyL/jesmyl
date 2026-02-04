import { cmComIsComMiniAnchorAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { CmComTool } from '../ComTool';

export const CmComToolMiniAnchorSwitch = () => {
  const isMiniAnchor = useAtomValue(cmComIsComMiniAnchorAtom);

  return (
    <CmComTool
      title={isMiniAnchor ? 'Раскрыть ссылки' : 'Свернуть ссылки'}
      icon={isMiniAnchor ? 'MinusSign' : 'Menu01'}
      onClick={cmComIsComMiniAnchorAtom.do.toggle}
    />
  );
};
