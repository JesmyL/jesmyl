import { cmComIsShowCatBindsInCompositionAtom } from '$cm/entities/index';
import { useAtom } from 'atomaric';
import { itNIt } from 'shared/utils';
import { CmComTool } from '../ComTool';

export const CmComToolCatsBinds = () => {
  const [isShowCatBinds, setIsShowCatBinds] = useAtom(cmComIsShowCatBindsInCompositionAtom);

  return (
    <>
      <CmComTool
        title="Показывать сборники"
        icon="BookOpen02"
        iconKind={isShowCatBinds ? 'SolidRounded' : 'StrokeRounded'}
        onClick={() => setIsShowCatBinds(itNIt)}
      />
    </>
  );
};
