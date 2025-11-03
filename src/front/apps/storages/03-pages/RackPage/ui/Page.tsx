import { Button } from '#shared/components/ui/button';
import { Modal } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { useAuth } from '$index/shared/state';
import { StoragesRackStatusFace } from '$storages/entities/RackStatusFace';
import { StoragesStatusManagerModalInner } from '$storages/features/StatusManager';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { Link, useNavigate } from '@tanstack/react-router';
import { atom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { StoragesRackMemberRole, StoragesRackWid } from 'shared/model/storages/list.model';
import { StoragesRackImportFromExcelModalInner } from './ImportFromExcelModalInner';
import { StoragesRackSearchModalInner } from './SearchModalInner';

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
                <StoragesRackStatusFace
                  statusi={card.status}
                  rack={rack}
                  card={card}
                  customTitile
                />
                <Button
                  onClick={() => {
                    navigate({
                      to: '/storages/i/$rackw/$cardMi',
                      params: { cardMi: '' + card.mi, rackw: '' + rack.w },
                    });
                  }}
                >
                  <span className="max-w-[calc(100vw-100px)]">
                    <span className="ellipsis">{card.title || <span className="text-xKO">Новая карточка</span>}</span>
                  </span>
                </Button>
              </div>
            );
          })}

          <Modal openAtom={isOpenSearchModal}>
            {rack && (
              <StoragesRackSearchModalInner
                rack={rack}
                onCardClick={card =>
                  navigate({
                    to: '/storages/i/$rackw/$cardMi',
                    params: { cardMi: '' + card.mi, rackw: '' + rack.w },
                  })
                }
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
              <BottomPopupItem
                icon="PlusSign"
                title="Создать карточку"
                onClick={async () => {
                  const cardMi = await storagesTsjrpcClient.createRackCard({ rackw });

                  navigate({
                    to: '/storages/i/$rackw/$cardMi',
                    params: {
                      cardMi: '' + cardMi,
                      rackw: '' + rackw,
                    },
                  });
                }}
              />

              <BottomPopupItem
                icon="Cube"
                onClick={isOpenStatusesRedactorModal.do.toggle}
                title="Редактироввать статусы"
              />

              <Link
                to="/storages/i/$rackw/edit"
                params={{ rackw: '' + rack.w }}
              >
                <BottomPopupItem
                  icon="Edit02"
                  titleNode={
                    <>
                      Редактировать <span className="text-x7">{rack.title}</span>
                    </>
                  }
                />
              </Link>

              <BottomPopupItem
                icon="FileImport"
                onClick={isOpenImportFromExcelModal.do.toggle}
                title="Сформировать карточки из Excel"
              />
            </BottomPopup>
          )}
        </>
      }
    />
  );
};
