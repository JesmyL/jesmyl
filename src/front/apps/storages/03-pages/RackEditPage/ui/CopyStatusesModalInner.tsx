import { Button } from '#shared/components/ui/button';
import { ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { StoragesRack, StoragesRackWid } from 'shared/model/storages/list.model';

export const StoragesRackEditCopyStatusesModalInner = ({ toRack }: { toRack: StoragesRack }) => {
  const [fromRackw, setFromRackw] = useState<StoragesRackWid | null>(null);
  const racks = useLiveQuery(() => storagesIDB.tb.racks.toArray(), []);
  const fromRack = useLiveQuery(() => (fromRackw ? storagesIDB.tb.racks.get(fromRackw) : undefined), [fromRackw]);

  return (
    <>
      <ModalHeader>
        Копирование статусов в <span className="text-x7">{toRack.title}</span>
      </ModalHeader>
      <ModalBody>
        {racks?.map(rack => {
          if (rack.w === toRack.w) return;

          return (
            <div key={rack.w}>
              <IconCheckbox
                checked={rack.w == fromRackw}
                onClick={() => setFromRackw(rack.w)}
                postfix={rack.title}
              />
            </div>
          );
        })}

        {fromRack && fromRack.statuses.length > toRack.statuses.length && (
          <div className="text-xKO mt-5">
            Количество статусов не совпадает! В<span className="text-x7"> {toRack.title} </span>
            будут добавлены новые статусы из
            <span className="text-x7"> {fromRack.title}</span>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={fromRackw == null}
          onClick={() => {
            if (fromRackw == null) return;
            return storagesTsjrpcClient.copyRackStatuses({ fromRackw, rackw: toRack.w });
          }}
        >
          Скопировать
        </Button>
      </ModalFooter>
    </>
  );
};
