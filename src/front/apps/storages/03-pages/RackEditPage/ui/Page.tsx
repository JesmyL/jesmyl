import { Button } from '#shared/components/ui/button';
import { makeElementGrabber } from '#shared/ui/ElementGrabber';
import { Modal } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { TextInput } from '#shared/ui/TextInput';
import { StoragesAddColumn } from '$storages/entities/AddColumn';
import { TheStoragesColumnEditColumn } from '$storages/entities/ColumnEdit';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { atom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { StoragesRackWid } from 'shared/model/storages/list.model';
import { twMerge } from 'tailwind-merge';
import { StoragesRackEditCopyStatusesModalInner } from './CopyStatusesModalInner';

const ItemGrabber = makeElementGrabber<number | null>();

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
            <TextInput
              defaultValue={rack.title}
              strongDefaultValue
              label="Название стеллажа"
              onChanged={title => storagesTsjrpcClient.renameRack({ rackw, title })}
            />

            <Button
              icon="Copy02"
              className="my-3"
              onClick={isOpenCopyStatusesModalAtom.do.toggle}
            >
              Копировать статусы из другого стеллажа
            </Button>

            <div>Специальные поля</div>

            <ItemGrabber.Root
              onDrop={({ grabbedValue, targetValue }) => {
                if (grabbedValue == null) return;
                return storagesTsjrpcClient.moveColumn({ coli: grabbedValue, newi: targetValue, rackw });
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
              onAdd={({ newColumnType, title, colCustomProps }) =>
                storagesTsjrpcClient.createColumn({
                  rackw: rack.w,
                  title,
                  newColumnType,
                  colCustomProps,
                })
              }
              rack={rack}
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
