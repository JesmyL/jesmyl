import { translateBase } from '#basis/locale';
import { cmComIsShowCatBindsInCompositionAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { MenuComToolName } from 'shared/api';
import { itNIt } from 'shared/utils';
import { CmComTool } from '../ComTool';

export const CmComToolCatsBinds = () => {
  const isShowCatBinds = useAtomValue(cmComIsShowCatBindsInCompositionAtom);

  return (
    <CmComTool
      title={translateBase(it => it.cm.com.tool[MenuComToolName.CatsBinds])}
      icon="BookOpen02"
      iconKind={isShowCatBinds ? 'SolidRounded' : undefined}
      onClick={() => cmComIsShowCatBindsInCompositionAtom.set(itNIt)}
    />
  );
};
