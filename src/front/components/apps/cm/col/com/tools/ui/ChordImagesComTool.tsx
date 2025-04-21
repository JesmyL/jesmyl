import { atom } from '#shared/lib/atom';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { useFixedCcom } from '$cm/basis/lib/com-selections';
import { ChordImagesList } from '../../chord-card/ChordImagesList';
import { ComTool } from '../ComTool';

const isOpenAtom = atom(false);

export const ChordImagesComTool = () => {
  const ccom = useFixedCcom();

  return (
    <>
      <ComTool
        title="Аппликатура аккордов"
        icon="TwoFinger05"
        iconClassName="-scale-x-100!"
        onClick={isOpenAtom.toggle}
      />

      <FullContent
        openAtom={isOpenAtom}
        closable
      >
        {ccom && <ChordImagesList com={ccom} />}
      </FullContent>
    </>
  );
};
