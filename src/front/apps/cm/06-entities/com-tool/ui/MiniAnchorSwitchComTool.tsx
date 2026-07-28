import { translateBase } from '#basis/locale';
import { cmComIsComMiniAnchorAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { MenuComToolName } from 'shared/api';
import { CmComTool } from '../ComTool';

export const CmComToolMiniAnchorSwitch = () => {
  const isMiniAnchor = useAtomValue(cmComIsComMiniAnchorAtom);

  return (
    <CmComTool
      title={translateBase(it => it.cm.com.tool[MenuComToolName.IsMiniAnchor], { v: +isMiniAnchor })}
      icon={isMiniAnchor ? 'MinusSign' : 'Menu01'}
      onClick={cmComIsComMiniAnchorAtom.do.toggle}
    />
  );
};
