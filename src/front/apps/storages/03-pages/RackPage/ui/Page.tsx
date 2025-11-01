import { Button } from '#shared/components/ui/button';
import { Modal } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAuth } from '$index/shared/state';
import { StoragesRackStatusFace } from '$storages/entities/RackStatusFace';
import { StoragesStatusManagerModalInner } from '$storages/features/StatusManager';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesRackCardModalInner } from '$storages/widgets/RackCardModalInner';
import { useNavigate } from '@tanstack/react-router';
import { atom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { StoragesRackCardMi, StoragesRackMemberRole, StoragesRackWid } from 'shared/model/storages/list.model';
import { StoragesRackImportFromExcelModalInner } from './ImportFromExcelModalInner';
import { StoragesRackSearchModalInner } from './SearchModalInner';

const editCardMiAtom = atom<StoragesRackCardMi | nil>(null);
const isOpenSearchModal = atom(false);
const isOpenImportFromExcelModal = atom(false);
const isOpenStatusesRedactorModal = atom(false);

export const StoragesRackPage = ({ rackw }: { rackw: StoragesRackWid }) => {
  const rack = useLiveQuery(() => storagesIDB.tb.racks.get(rackw), [rackw]);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (rack == null || auth.login == null) return;
    const member = rack.team[auth.login];
    if (
      member == null ||
      (member.role !== StoragesRackMemberRole.Admin && member.role !== StoragesRackMemberRole.Creator)
    ) {
      storagesIDB.tb.racks.delete(rack.w);
      navigate({ to: '/storages/i' });
    }
  }, [auth.login, navigate, rack]);

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
                className="flex gap-2 my-3"
              >
                <Button onClick={() => editCardMiAtom.set(card.mi)}>
                  <LazyIcon icon={rack.statuses[card.status ?? 0].icon ?? 'Cube'} />
                  <span className="max-w-[calc(100vw-120px)]">
                    <span className="ellipsis">{card.title || <span className="text-xKO">Новая карточка</span>}</span>
                  </span>
                </Button>
                <StoragesRackStatusFace
                  statusi={card.status}
                  rack={rack}
                  card={card}
                  customTitile
                />
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

          <Modal openAtom={isOpenStatusesRedactorModal}>
            <StoragesStatusManagerModalInner rack={rack} />
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

              <BottomPopupItem
                icon="Cube"
                onClick={isOpenStatusesRedactorModal.do.toggle}
                title="Редактироввать статусы"
              />
            </BottomPopup>
          )}
        </>
      }
    />
  );
};
