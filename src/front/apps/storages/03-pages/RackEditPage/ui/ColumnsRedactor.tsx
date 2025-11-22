import { Button } from '#shared/components/ui/button';
import { makeElementGrabber } from '#shared/ui/ElementGrabber';
import { Modal } from '#shared/ui/modal';
import { StoragesAddColumn } from '$storages/entities/AddColumn';
import { TheStoragesColumnEditColumn } from '$storages/entities/ColumnEdit';
import { StoragesStatusManagerModalInner } from '$storages/features/StatusManager';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { atom } from 'atomaric';
import { StoragesRack } from 'shared/model/storages/list.model';
import { twMerge } from 'tailwind-merge';

const ItemGrabber = makeElementGrabber<number | null>();

const isOpenAddColumnModalAtom = atom(false);
const isOpenStatusesRedactorModal = atom(false);

export const StoragesRackEditColumnsRedactor = ({ rack }: { rack: StoragesRack }) => {
  return (
    <>
      <Button
        icon="Cube"
        className="mt-5"
        onClick={isOpenStatusesRedactorModal.do.toggle}
      >
        Редактироввать статусы
      </Button>

      <div className="mt-15">Специальные поля</div>

      <ItemGrabber.Root
        onDrop={({ grabbedValue, targetValue }) => {
          if (grabbedValue == null) return;
          return storagesTsjrpcClient.moveColumn({ coli: grabbedValue, newi: targetValue, rackw: rack.w });
        }}
      >
        {(rack.colsOrd ?? rack.cols.map((_, i) => i)).map((coli, coliIndex) => {
          return (
            <div key={coli}>
              <div className="flex w-full justify-end">
                <ItemGrabber.Drop
                  value={coliIndex}
                  render={({ className, onDrop }) => (
                    <Button
                      icon="PinLocation01"
                      className={className}
                      onClick={() => onDrop(coliIndex)}
                      attr-id={coliIndex}
                    />
                  )}
                />
              </div>

              <TheStoragesColumnEditColumn
                coli={coli}
                rack={rack}
                grabNode={
                  <ItemGrabber.Grab
                    value={coliIndex}
                    render={({ className, onGrab }) => (
                      <Button
                        icon="Hold01"
                        className={className}
                        onClick={() => onGrab(coliIndex)}
                      />
                    )}
                    renderStop={({ className, onStop }) => (
                      <Button
                        icon="Unavailable"
                        className={className}
                        onClick={onStop}
                      />
                    )}
                  />
                }
              />
            </div>
          );
        })}
        <div className="flex w-full justify-end">
          <ItemGrabber.Drop
            value={null}
            render={({ className, onDrop }) => (
              <Button
                icon="PinLocation01"
                className={twMerge(className)}
                onClick={() => onDrop(null)}
              />
            )}
          />
        </div>
      </ItemGrabber.Root>

      <StoragesAddColumn
        isOpenModalAtom={isOpenAddColumnModalAtom}
        rack={rack}
        onAdd={({ newColumnType, title, colCustomProps }) =>
          storagesTsjrpcClient.createColumn({
            rackw: rack.w,
            title,
            newColumnType,
            colCustomProps,
          })
        }
      />

      <Modal openAtom={isOpenStatusesRedactorModal}>
        <StoragesStatusManagerModalInner rack={rack} />
      </Modal>
    </>
  );
};
