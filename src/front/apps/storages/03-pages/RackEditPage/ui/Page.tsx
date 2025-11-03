import { Button } from '#shared/components/ui/button';
import { Modal } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { atom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { StoragesRackWid } from 'shared/model/storages/list.model';
import { StoragesRackEditCopyStatusesModalInner } from './CopyStatusesModalInner';

const isOpenCopyStatusesModalAtom = atom(false);

export const StoragesRackEditPage = ({ rackw }: { rackw: StoragesRackWid }) => {
  const rack = useLiveQuery(() => storagesIDB.tb.racks.get(rackw), [rackw]);

  return (
    <PageContainerConfigurer
      className="StoragesRackEditPage"
      headTitle={
        <>
          Редактирование - <span className="text-x7">{rack?.title}</span>
        </>
      }
      content={
        <>
          <Button
            icon="Copy02"
            onClick={isOpenCopyStatusesModalAtom.do.toggle}
          >
            Копировать статусы из другого стеллажа
          </Button>

          <Modal openAtom={isOpenCopyStatusesModalAtom}>
            {rack && <StoragesRackEditCopyStatusesModalInner toRack={rack} />}
          </Modal>
        </>
      }
    />
  );
};
