import { cmIsShowCatBindsInCompositionAtom } from '$cm/atoms';
import { useAtom } from 'atomaric';
import { itNIt } from 'shared/utils';
import { ComTool } from '../ComTool';

export const CmCatsBindsComTool = () => {
  const [isShowCatBinds, setIsShowCatBinds] = useAtom(cmIsShowCatBindsInCompositionAtom);

  return (
    <>
      <ComTool
        title="Показывать сборники"
        icon="BookOpen02"
        iconKind={isShowCatBinds ? 'SolidRounded' : 'StrokeRounded'}
        onClick={() => setIsShowCatBinds(itNIt)}
      />
    </>
  );
};
