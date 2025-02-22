import { useAtomSet } from '#shared/lib/atoms';
import { isOpenChordImagesAtom } from '@cm/atoms';
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
