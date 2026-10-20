import { translateBase } from '#basis/locale';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { CmChordCardImageList } from '$cm/entities/chord-card';
import { useCmCom, useCmComLastOpenComw } from '$cm/entities/com';
import { Atom, atom } from 'atomaric';
import { MenuComToolName } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { CmComTool } from '../ComTool';

let isOpenAtom: Atom<boolean>;

export const CmComToolChordImages = () => {
  isOpenAtom ??= atom(false);

  const comw = useCmComLastOpenComw();
  const ccom = useCmCom(comw);

  return (
    <>
      <CmComTool
        title={translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.ChordImages])}
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
