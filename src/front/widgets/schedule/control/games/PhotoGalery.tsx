import { mylib } from '#shared/lib/my-lib';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { ModalBody, ModalHeader } from '#shared/ui/modal';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { Atom, atom, useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { IScheduleWidgetUser } from 'shared/api';
import { ScheduleWidgetUserPhoto } from '../users/UserPhoto';
import { ScheduleWidgetRemovableUserFace } from './RemovableUserFace';
import { checkIsUserPhotoable } from './utils';

let termAtom: Atom<string>;

export const ScheduleWidgetPhotoGalery = () => {
  termAtom ??= atom('');

  const rights = useScheduleWidgetRightsContext();
  const term = useAtomValue(termAtom);

  const filteredUsers: IScheduleWidgetUser[] = useMemo(() => {
    const sortedUsers = rights.schedule.ctrl.users.sort((a, b) => (a.fio! < b.fio! ? -1 : a.fio! > b.fio! ? 1 : 0));
    return !term ? sortedUsers : mylib.searchRate(sortedUsers, term, ['fio']).map(({ item }) => item);
  }, [rights.schedule.ctrl.users, term]);

  return (
    <>
      <DebouncedSearchInput
        className="debounced-searcher round-styled"
        placeholder="Фильтр по имени"
        termAtom={termAtom}
      />
      <ModalHeader>Фотографии (локально)</ModalHeader>
      <ModalBody>
        {filteredUsers.map(user => {
          if (!checkIsUserPhotoable(user)) return null;

          return (
            <div
              key={user.mi}
              className="flex center column my-5"
            >
              <ScheduleWidgetRemovableUserFace user={user} />
              <ScheduleWidgetUserPhoto user={user} />
            </div>
          );
        })}
      </ModalBody>
    </>
  );
};
