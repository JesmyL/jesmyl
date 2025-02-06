import { isOpenChordImagesAtom } from 'front/components/apps/cm/atoms';
import { useAtomSet } from '../../../../../../../complect/atoms';
import { IconImageCompositionOvalStrokeRounded } from '../../../../../../../complect/the-icon/icons/image-composition-oval';
import { ComTool } from '../ComTool';

export const ChordImagesTool = () => {
  const setIsOpen = useAtomSet(isOpenChordImagesAtom);

  return (
    <ComTool
      title="Изображения аккордов"
      Icon={IconImageCompositionOvalStrokeRounded}
      onClick={() => setIsOpen(true)}
    />
  );
};
