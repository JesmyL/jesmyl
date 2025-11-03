import { Button } from '#shared/components/ui/button';
import { Modal } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { StoragesAddColumn } from '$storages/entities/AddColumn';
import { TheStoragesColumnEditColumn } from '$storages/entities/ColumnEdit';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { atom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { StoragesRackWid } from 'shared/model/storages/list.model';
import { StoragesRackEditCopyStatusesModalInner } from './CopyStatusesModalInner';

const isOpenCopyStatusesModalAtom = atom(false);
const isOpenAddColumnModalAtom = atom(false);

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
        rack && (
          <>
            <Button
              icon="Copy02"
              onClick={isOpenCopyStatusesModalAtom.do.toggle}
            >
              Копировать статусы из другого стеллажа
            </Button>

            <div>Специальные поля</div>

            {rack.cols.map((_, coli) => {
              return (
                <TheStoragesColumnEditColumn
                  key={coli}
                  coli={coli}
                  rack={rack}
                />
              );
            })}

            <StoragesAddColumn
              isOpenModalAtom={isOpenAddColumnModalAtom}
              onAdd={(newColumnType, title) =>
                storagesTsjrpcClient.createColumn({ rackw: rack.w, title, newColumnType })
              }
            />

            <Modal openAtom={isOpenCopyStatusesModalAtom}>
              {rack && <StoragesRackEditCopyStatusesModalInner toRack={rack} />}
            </Modal>
          </>
        )
      }
    />
  );
};
