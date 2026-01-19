import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { Modal, ModalBody, ModalFooter, usePrompt } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesRackStatusEditModalInner } from '$storages/widgets/RackStatusEditModalInner';
import { StoragesRack } from 'shared/model/storages/list.model';
import { storagesStatusManagerRackEditStatusiAtom } from '../state/atoms';

export const StoragesStatusManagerModalInner = ({ rack }: { rack: StoragesRack }) => {
  const prompt = usePrompt();
  const { indexes, list } = mylib.resortByOrder(rack.statusOrd, rack.statuses);

  return (
    <>
      <ModalBody>
        {list.map((status, statusii) => {
          const statusi = indexes[statusii] ?? statusii;

          return (
            <div
              key={statusi}
              className="relative mb-8 flex justify-between w-full"
            >
              {!statusii || (
                <Button
                  icon="ArrowDataTransferVertical"
                  className="absolute left-10 bottom-8"
                  onClick={() => storagesTsjrpcClient.resortRackStatuses({ rackw: rack.w, statusi })}
                />
              )}
              <span
                className="flex gap-2 max-w-[80cqw]"
                style={{ color: status.color }}
              >
                <LazyIcon icon={status.icon ?? 'Cube'} />
                <span className="ellipsis">{status.title}</span>
              </span>
              <Button
                icon="Settings01"
                onClick={() => storagesStatusManagerRackEditStatusiAtom.set(statusi)}
              />
            </div>
          );
        })}
      </ModalBody>

      <ModalFooter>
        <Button
          icon="PlusSign"
          className="text-x7"
          onClick={async () => {
            const newStatusTitle = await prompt('Название нового статуса', 'Новый статус');
            if (!newStatusTitle) return;
            return storagesTsjrpcClient.createRackStatus({ rackw: rack.w, title: newStatusTitle });
          }}
        >
          Новый статус
        </Button>
      </ModalFooter>

      <Modal openAtom={storagesStatusManagerRackEditStatusiAtom}>
        {statusi => (
          <StoragesRackStatusEditModalInner
            rack={rack}
            statusi={statusi}
          />
        )}
      </Modal>
    </>
  );
};
