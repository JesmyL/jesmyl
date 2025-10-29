import { Button } from '#shared/components/ui/button';
import { Modal } from '#shared/ui/modal';
import { atom } from 'atomaric';
import { StoragesRack } from 'shared/model/storages/list.model';
import { StoragesRackAddFieldModalInner } from './ModalInner';

const isOpenModalAtom = atom(false);

export const StoragesRackAddField = ({ rack }: { rack: StoragesRack }) => {
  return (
    <>
      <Button
        icon="PlusSign"
        onClick={isOpenModalAtom.do.toggle}
      >
        Создать новое поле
      </Button>

      <Modal openAtom={isOpenModalAtom}>
        <StoragesRackAddFieldModalInner rack={rack} />
      </Modal>
    </>
  );
};
