import { isOpenChordImagesAtom } from 'front/components/apps/cm/atoms';
import { useAtomSet } from '../../../../../../../complect/atoms';
import { ComTool } from '../ComTool';

export const ChordImagesTool = () => {
  const setIsOpen = useAtomSet(isOpenChordImagesAtom);

  return (
    <ComTool
      title="Изображения аккордов"
      icon="ImageCompositionOval"
      onClick={() => setIsOpen(true)}
    />
  );
};
