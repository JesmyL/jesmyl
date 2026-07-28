import { translateBase } from '#basis/locale';
import { Modal } from '#shared/ui/modal';
import { useCmComCurrent } from '$cm/entities/com';
import { CmComCopyTextModalInner } from '$cm/features/com';
import { Atom, atom } from 'atomaric';
import { MenuComToolName } from 'shared/api';
import { CmComTool } from '../ComTool';

let isOpenAtom: Atom<boolean>;

export const CmComToolCopyText = () => {
  isOpenAtom ??= atom(false);

  const ccom = useCmComCurrent();

  return (
    <>
      <CmComTool
        title={translateBase(it => it.cm.com.tool[MenuComToolName.CopyCom])}
        icon="Copy01"
        onClick={isOpenAtom.do.toggle}
      />

      <Modal openAtom={isOpenAtom}>{ccom && <CmComCopyTextModalInner com={ccom} />}</Modal>
    </>
  );
};
