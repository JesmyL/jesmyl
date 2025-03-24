import { useAtom } from '#shared/lib/atom';
import { cmIsShowCatBindsInCompositionAtom } from '$cm/atoms';
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
