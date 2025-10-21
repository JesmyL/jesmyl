import { Modal } from '#shared/ui/modal';
import { useCmComCurrent } from '$cm/entities/com';
import { CmComCopyTextModalInner } from '$cm/features/com';
import { atom } from 'atomaric';
import { CmComTool } from '../ComTool';

const isOpenAtom = atom(false);

export const CmComToolCopyText = () => {
  const ccom = useCmComCurrent();

  return (
    <>
      <CmComTool
        title="Копировать текст песни"
        icon="Copy01"
        onClick={isOpenAtom.do.toggle}
      />

      <Modal openAtom={isOpenAtom}>{ccom && <CmComCopyTextModalInner com={ccom} />}</Modal>
    </>
  );
};
