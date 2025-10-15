import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { useCmComCurrentFixedCom } from '$cm/entities/com';
import { atom } from 'atomaric';
import { CmChordCardImageList } from '../../chord-card/ui/ChordImagesList';
import { CmComTool } from '../ComTool';

const isOpenAtom = atom(false);

export const CmComToolChordImages = () => {
  const ccom = useCmComCurrentFixedCom();

  return (
    <>
      <CmComTool
        title="Аппликатура аккордов"
        icon="TwoFinger05"
        iconClassName="-scale-x-100!"
        onClick={isOpenAtom.do.toggle}
      />

      <FullContent
        openAtom={isOpenAtom}
        closable
      >
        {ccom && <CmChordCardImageList com={ccom} />}
      </FullContent>
    </>
  );
};
