import { Button } from '#shared/components/ui/button';
import { Modal } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { StoragesRackStatusFace } from '$storages/entities/RackStatusFace';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesRackCardEditModalInner } from '$storages/widgets/RackCardEditModalInner';
import { atom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { StoragesRackCardMi, StoragesRackWid } from 'shared/model/storages/list.model';

const editCardMiAtom = atom<StoragesRackCardMi | nil>(null);

export const StoragesRackPage = ({ rackw }: { rackw: StoragesRackWid }) => {
  const rack = useLiveQuery(() => storagesIDB.tb.racks.get(rackw), [rackw]);

  return (
    <PageContainerConfigurer
      className="StoragesRackPage"
      headTitle="Стеллаж"
      head={
        <Button
          icon="PlusSign"
          disabled={rack?.list.some(rack => !rack.title)}
          onClick={() => storagesTsjrpcClient.createRackCard({ rackw })}
        >
          Карточка
        </Button>
      }
      content={
        <>
          {rack?.list.map(card => {
            return (
              <div
                key={card.mi}
                className="my-3"
              >
                <Button onClick={() => editCardMiAtom.set(card.mi)}>
                  <StoragesRackStatusFace
                    rackStatus={rack.statuses[card.status ?? 0]}
                    customTitile={card.title}
                  />
                </Button>
              </div>
            );
          })}

          <Modal openAtom={editCardMiAtom}>
            {cardMi => {
              const card = rack?.list.find(it => it.mi === cardMi);

              return (
                rack &&
                card && (
                  <StoragesRackCardEditModalInner
                    card={card}
                    rack={rack}
                  />
                )
              );
            }}
          </Modal>
        </>
      }
    />
  );
};
