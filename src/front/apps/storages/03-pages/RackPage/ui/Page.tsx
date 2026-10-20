import { translateBase } from '#basis/locale';
import { Modal } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { QrReader } from '#shared/ui/qr-code/QrReader';
import { useAuth } from '$index/shared/state';
import { StoragesRackCardSearch } from '$storages/features/RackCardSearch';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesRackCardListWidget } from '$storages/widgets/RackCardListWidget';
import { StoragesRackCardSortAndGroupsModalInner } from '$storages/widgets/RackCardSortAndGroupsModalInner';
import { Link, useNavigate } from '@tanstack/react-router';
import { Atom, atom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { StoragesRackMemberRole, StoragesRackWid } from 'shared/model/storages/list.model';
import { checkIsNotString, checkIsObject } from 'shared/utils/checkIs';
import { StoragesRackImportFromExcelModalInner } from './ImportFromExcelModalInner';

let isOpenImportFromExcelModalAtom: Atom<boolean>;
let isOpenGroupAnsSortingModalAtom: Atom<boolean>;
let isOpenMemberAdderModalAtom: Atom<boolean>;

export const StoragesRackPage = ({ rackw }: { rackw: StoragesRackWid }) => {
  isOpenImportFromExcelModalAtom ??= atom(false);
  isOpenGroupAnsSortingModalAtom ??= atom(false);
  isOpenMemberAdderModalAtom ??= atom(false);

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
      headTitle={rack.title ?? translateBase(BaseLocaleKey.StoragesRack)}
      head={<StoragesRackCardSearch rack={rack} />}
      onMoreClick={setIsMoreOpen}
      content={
        <>
          <StoragesRackCardListWidget rack={rack} />

          <Modal openAtom={isOpenImportFromExcelModalAtom}>
            <StoragesRackImportFromExcelModalInner rack={rack} />
          </Modal>

          <QrReader
            openAtom={isOpenMemberAdderModalAtom}
            onReadData={value => {
              const auth = JSON.parse(value) as unknown;

              if (
                !checkIsObject(auth) ||
                !('fio' in auth) ||
                !('login' in auth) ||
                checkIsNotString(auth.fio) ||
                checkIsNotString(auth.login)
              )
                return;

              isOpenMemberAdderModalAtom.reset();

              return storagesTsjrpcClient.addRackMember({
                member: { fio: auth.fio, role: StoragesRackMemberRole.Admin },
                login: auth.login as never,
                rackw,
              });
            }}
          />

          <Modal openAtom={isOpenGroupAnsSortingModalAtom}>
            <StoragesRackCardSortAndGroupsModalInner rack={rack} />
          </Modal>

          {isMoreOpen && (
            <BottomPopup onClose={setIsMoreOpen}>
              <BottomPopupItem
                icon="PlusSign"
                title={translateBase(BaseLocaleKey.StoragesCreateCard)}
                onClick={async () => {
                  const cardi = await storagesTsjrpcClient.createRackCard({ rackw });

                  navigate({
                    to: '/storages/i/$rackw/$cardi',
                    params: {
                      cardi: '' + cardi,
                      rackw: '' + rackw,
                    },
                  });
                }}
              />

              <BottomPopupItem
                icon="SortingAZ01"
                title={translateBase(BaseLocaleKey.StoragesSortAndGroup)}
                onClick={isOpenGroupAnsSortingModalAtom.do.toggle}
              />

              <Link
                to="/storages/i/$rackw/edit"
                params={{ rackw: '' + rack.w }}
              >
                <BottomPopupItem
                  icon="Edit02"
                  titleNode={
                    <>
                      {translateBase(BaseLocaleKey.Redact)} <span className="text-x7">{rack.title}</span>
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
                  titleNode={<>{translateBase(BaseLocaleKey.StoragesSums)}</>}
                />
              </Link>

              <BottomPopupItem
                icon="FileImport"
                onClick={isOpenImportFromExcelModalAtom.do.toggle}
                title={translateBase(BaseLocaleKey.StoragesCardsFromExcel)}
              />

              <BottomPopupItem
                icon="QrCode"
                onClick={isOpenMemberAdderModalAtom.do.toggle}
                title={translateBase(BaseLocaleKey.StoragesAddMember)}
              />
            </BottomPopup>
          )}
        </>
      }
    />
  );
};
