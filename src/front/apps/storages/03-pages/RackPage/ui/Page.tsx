import { Button } from '#shared/components/ui/button';
import { Modal } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { StoragesRackStatusFace } from '$storages/entities/RackStatusFace';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesRackCardModalInner } from '$storages/widgets/RackCardModalInner';
import { atom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { StoragesRackCardMi, StoragesRackWid } from 'shared/model/storages/list.model';
import { StoragesRackImportFromExcelModalInner } from './ImportFromExcelModalInner';
import { StoragesRackSearchModalInner } from './SearchModalInner';

const editCardMiAtom = atom<StoragesRackCardMi | nil>(null);
const isOpenSearchModal = atom(false);
const isOpenImportFromExcelModal = atom(false);

export const StoragesRackPage = ({ rackw }: { rackw: StoragesRackWid }) => {
  const rack = useLiveQuery(() => storagesIDB.tb.racks.get(rackw), [rackw]);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  if (rack == null) return;

  return (
    <PageContainerConfigurer
      className="StoragesRackPage"
      headTitle={rack.title ?? 'Стеллаж'}
      head={
        <Button
          icon="SearchVisual"
          onClick={isOpenSearchModal.do.toggle}
        />
      }
      onMoreClick={setIsMoreOpen}
      content={
        <>
          {rack.cards.map(card => {
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
              const card = rack.cards.find(it => it.mi === cardMi);

              return (
                rack &&
                card && (
                  <StoragesRackCardModalInner
                    card={card}
                    rack={rack}
                  />
                )
              );
            }}
          </Modal>

          <Modal openAtom={isOpenSearchModal}>
            {rack && (
              <StoragesRackSearchModalInner
                rack={rack}
                onCardClick={card => editCardMiAtom.set(card.mi)}
              />
            )}
          </Modal>

          <Modal openAtom={isOpenImportFromExcelModal}>
            <StoragesRackImportFromExcelModalInner rack={rack} />
          </Modal>

          {isMoreOpen && (
            <BottomPopup onClose={setIsMoreOpen}>
              {!rack.cards.some(rack => !rack.title) && (
                <BottomPopupItem
                  icon="PlusSign"
                  onClick={() => storagesTsjrpcClient.createRackCard({ rackw })}
                  title="Создать карточку"
                />
              )}

              <BottomPopupItem
                icon="FileImport"
                onClick={isOpenImportFromExcelModal.do.toggle}
                title="Импорт из Excel"
              />
            </BottomPopup>
          )}
        </>
      }
    />
  );
};
