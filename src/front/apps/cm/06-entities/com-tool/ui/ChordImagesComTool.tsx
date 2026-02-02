import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { useCmComCurrentFixedCom } from '$cm/entities/com';
import { Atom, atom } from 'atomaric';
import { CmChordCardImageList } from '../../chord-card/ui/ChordImagesList';
import { CmComTool } from '../ComTool';

let isOpenAtom: Atom<boolean>;

export const CmComToolChordImages = () => {
  isOpenAtom ??= atom(false);

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
