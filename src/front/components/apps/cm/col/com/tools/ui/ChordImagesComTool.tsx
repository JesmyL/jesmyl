import { atom } from '#shared/lib/atom';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { useCcom } from '$cm/basis/lib/com-selections';
import { ChordImagesList } from '../../chord-card/ChordImagesList';
import { ComTool } from '../ComTool';

const isOpenAtom = atom(false);

export const ChordImagesComTool = () => {
  const ccom = useCcom();

  return (
    <>
      <ComTool
        title="Изображения аккордов"
        icon="ImageCompositionOval"
        onClick={isOpenAtom.toggle}
      />

      <FullContent openAtom={isOpenAtom}>{ccom && <ChordImagesList comw={ccom.wid} />}</FullContent>
    </>
  );
};
