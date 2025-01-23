import { useAtom } from 'front/complect/atoms';
import { IconBookOpen02SolidRounded, IconBookOpen02StrokeRounded } from 'front/complect/the-icon/icons/book-open-02';
import { cmIsShowCatBindsInCompositionAtom } from 'front/components/apps/cm/atoms';
import { itNIt } from 'shared/utils';
import { ComTool } from '../ComTool';

export const CmCatsBindsComTool = () => {
  const [isShowCatBinds, setIsShowCatBinds] = useAtom(cmIsShowCatBindsInCompositionAtom);

  return (
    <>
      <ComTool
        title="Показывать сборники"
        Icon={isShowCatBinds ? IconBookOpen02SolidRounded : IconBookOpen02StrokeRounded}
        onClick={() => setIsShowCatBinds(itNIt)}
      />
    </>
  );
};
