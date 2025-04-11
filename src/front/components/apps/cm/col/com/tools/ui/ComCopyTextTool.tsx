import { atom } from '#shared/lib/atom';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { useCcom } from '$cm/basis/lib/com-selections';
import { ComCopyTextModalInner } from '$cm/widgets/ComCopyTextModalInner';
import { ComTool } from '../ComTool';

const isOpenAtom = atom(false);

export const ComCopyTextTool = () => {
  const ccom = useCcom();

  return (
    <>
      <ComTool
        title="Копировать текст песни"
        icon="Copy01"
        onClick={isOpenAtom.toggle}
      />

      <Modal openAtom={isOpenAtom}>{ccom && <ComCopyTextModalInner com={ccom} />}</Modal>
    </>
  );
};
