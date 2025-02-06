import { mylib } from 'front/utils';
import { useMemo, useState } from 'react';
import { IScheduleWidgetUser } from 'shared/api';
import DebouncedSearchInput from '../../../DebouncedSearchInput';
import { ModalBody } from '../../../modal/Modal/ModalBody';
import { ModalHeader } from '../../../modal/Modal/ModalHeader';
import { useScheduleWidgetRightsContext } from '../../useScheduleWidget';
import ScheduleWidgetUserPhoto from '../users/UserPhoto';
import ScheduleWidgetRemovableUserFace from './RemovableUserFace';
import { checkIsUserPhotoable } from './utils';

export const ScheduleWidgetPhotoGalery = () => {
  const rights = useScheduleWidgetRightsContext();
  const [term, setTerm] = useState('');

  const filteredUsers: IScheduleWidgetUser[] = useMemo(() => {
    const sortedUsers = rights.schedule.ctrl.users.sort((a, b) => (a.fio! < b.fio! ? -1 : a.fio! > b.fio! ? 1 : 0));
    return !term ? sortedUsers : mylib.searchRate(sortedUsers, term, ['fio']).map(({ item }) => item);
  }, [rights.schedule.ctrl.users, term]);

  return (
    <>
      <DebouncedSearchInput
        className="debounced-searcher round-styled"
        placeholder="Фильтр по имени"
        debounce={300}
        onDebounced={setTerm}
      />
      <ModalHeader>Фотографии (локально)</ModalHeader>
      <ModalBody>
        {filteredUsers.map(user => {
          if (!checkIsUserPhotoable(user)) return null;

          return (
            <div
              key={user.mi}
              className="flex center column margin-big-gap-v"
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
