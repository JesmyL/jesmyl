import { useAtom } from '#shared/lib/atoms';
import { cmIsShowCatBindsInCompositionAtom } from 'front/components/apps/cm/atoms';
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
