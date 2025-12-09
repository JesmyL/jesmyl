import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { Modal } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { QrReader } from '#shared/ui/qr-code/QrReader';
import { useAuth } from '$index/shared/state';
import { StoragesRackStatusFace } from '$storages/entities/RackStatusFace';
import { StoragesRackCardSearch } from '$storages/features/RackCardSearch';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { Link, useNavigate } from '@tanstack/react-router';
import { atom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { StoragesRackMemberRole, StoragesRackWid } from 'shared/model/storages/list.model';
import { StoragesRackImportFromExcelModalInner } from './ImportFromExcelModalInner';

const isOpenImportFromExcelModal = atom(false);
const isOpenMemberAdderModal = atom(false);

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
      head={<StoragesRackCardSearch rack={rack} />}
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

          <Modal openAtom={isOpenImportFromExcelModal}>
            <StoragesRackImportFromExcelModalInner rack={rack} />
          </Modal>

          <QrReader
            openAtom={isOpenMemberAdderModal}
            onReadData={value => {
              const auth = JSON.parse(value) as unknown;

              if (
                !mylib.isObj(auth) ||
                !('fio' in auth) ||
                !('login' in auth) ||
                !mylib.isStr(auth.fio) ||
                !mylib.isStr(auth.login)
              )
                return;

              isOpenMemberAdderModal.reset();

              return storagesTsjrpcClient.addRackMember({
                member: { fio: auth.fio, role: StoragesRackMemberRole.Admin },
                login: auth.login as never,
                rackw,
              });
            }}
          />

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

              <Link
                to="/storages/i/$rackw/sum"
                params={{ rackw: '' + rack.w }}
              >
                <BottomPopupItem
                  icon="CheckList"
                  titleNode={<>Сводки</>}
                />
              </Link>

              <BottomPopupItem
                icon="FileImport"
                onClick={isOpenImportFromExcelModal.do.toggle}
                title="Сформировать карточки из Excel"
              />

              <BottomPopupItem
                icon="QrCode"
                onClick={isOpenMemberAdderModal.do.toggle}
                title="Добавить участника"
              />
            </BottomPopup>
          )}
        </>
      }
    />
  );
};
