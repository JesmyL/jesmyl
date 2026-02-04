import { cmComIsShowCatBindsInCompositionAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { itNIt } from 'shared/utils';
import { CmComTool } from '../ComTool';

export const CmComToolCatsBinds = () => {
  const isShowCatBinds = useAtomValue(cmComIsShowCatBindsInCompositionAtom);

  return (
    <CmComTool
      title="Показывать сборники"
      icon="BookOpen02"
      iconKind={isShowCatBinds ? 'SolidRounded' : undefined}
      onClick={() => cmComIsShowCatBindsInCompositionAtom.set(itNIt)}
    />
  );
};
