import { translateBase } from '#basis/locale';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { atom, useAtomValue } from 'atomaric';
import { ReactNode, useMemo, useState } from 'react';
import { UserId, UserInfoUnsecure } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { searchRate, sortBySearchRate } from 'shared/utils/searchRate';
import { takeUserAuthName } from 'shared/utils/user.utils';

interface Props {
  title: ReactNode;
  userIds: UserId[];
  userInfoById: Map<UserId, UserInfoUnsecure>;
  isCanUpdate: boolean;
  onChange: (userIds: UserId[]) => Promise<unknown>;
}

const searchPlaces = [['uauth', 'fio'], ['uauth', 'nick'], ['uauth', 'email'], 'l'];
const resultLimit = 30;

const takeUserName = (id: UserId, userInfoById: Map<UserId, UserInfoUnsecure>) => {
  const userInfo = userInfoById.get(id);

  return takeUserAuthName(userInfo?.uauth) || userInfo?.l || `${id}`;
};

export function CmEditorEventsComsRightsUsersList({ title, userIds, userInfoById, isCanUpdate, onChange }: Props) {
  const [isOpenAtom] = useState(() => atom(false));
  const [termAtom] = useState(() => atom(''));
  const term = useAtomValue(termAtom).trim();

  const candidates = useMemo(() => {
    const selectedIds = new Set(userIds);
    const list = [...userInfoById.values()].filter(userInfo => !selectedIds.has(userInfo.id));
    const toCandidate = (userInfo: UserInfoUnsecure) => ({
      id: userInfo.id,
      title: takeUserName(userInfo.id, userInfoById),
    });

    if (!term) return list.map(toCandidate).sort((a, b) => (a.title < b.title ? -1 : 1));

    return searchRate(list, term, searchPlaces)
      .sort(sortBySearchRate)
      .slice(0, resultLimit)
      .map(({ item }) => toCandidate(item));
  }, [term, userIds, userInfoById]);

  return (
    <>
      <div className="flex gap-2 between my-2">
        <span className="text-x7">{title}</span>
        {isCanUpdate && (
          <LazyIcon
            icon="UserAdd01"
            className="pointer"
            onClick={isOpenAtom.do.toggle}
          />
        )}
      </div>
      <div className="flex gap-2 flex-wrap mb-3">
        {!userIds.length && <span className="text-x7">{translateBase(BaseLocaleKey.EmptyList)}</span>}
        {userIds.map(id => (
          <span
            key={id}
            className="flex gap-1 bg-x2 p-1 rounded"
          >
            {takeUserName(id, userInfoById)}
            {isCanUpdate && (
              <TheIconSendButton
                icon="Cancel01"
                onSend={() => onChange(userIds.filter(userId => userId !== id))}
              />
            )}
          </span>
        ))}
      </div>

      <Modal openAtom={isOpenAtom}>
        <ModalHeader>{translateBase(BaseLocaleKey.ToAdd)}</ModalHeader>
        <ModalBody>
          <DebouncedSearchInput
            className="debounced-searcher round-styled"
            placeholder={translateBase(BaseLocaleKey.ScheduleFilterByName)}
            termAtom={termAtom}
          />
          {!candidates.length && <div className="text-x7">{translateBase(BaseLocaleKey.EmptyList)}</div>}
          {candidates.map(({ id, title }) => (
            <div
              key={id}
              className="flex gap-2 between my-2"
            >
              <span>{title}</span>
              <TheIconSendButton
                icon="PlusSign"
                onSuccess={isOpenAtom.reset}
                onSend={() => onChange([...userIds, id])}
              />
            </div>
          ))}
        </ModalBody>
      </Modal>
    </>
  );
}
