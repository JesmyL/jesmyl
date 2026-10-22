import { translateBase } from '#basis/locale';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { ModalBody, ModalHeader } from '#shared/ui/modal';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { takeScheduleWidgetUserName } from '#widgets/schedule/useScheduleWidget';
import { Atom, atom, useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { IScheduleWidgetUser } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { searchRate } from 'shared/utils/searchRate';
import { ScheduleWidgetUserPhoto } from '../users/UserPhoto';
import { ScheduleWidgetRemovableUserFace } from './RemovableUserFace';
import { checkIsUserPhotoable } from './utils';

let termAtom: Atom<string>;

export const ScheduleWidgetPhotoGalery = () => {
  termAtom ??= atom('');

  const rights = useScheduleWidgetRightsContext();
  const term = useAtomValue(termAtom);

  const filteredUsers: IScheduleWidgetUser[] = useMemo(() => {
    const userBoxes = rights.schedule.ctrl.users
      .map(user => ({ user, title: takeScheduleWidgetUserName(rights, user) }))
      .sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));

    return !term ? userBoxes.map(({ user }) => user) : searchRate(userBoxes, term, ['title']).map(({ item }) => item.user);
  }, [rights, term]);

  return (
    <>
      <DebouncedSearchInput
        className="debounced-searcher round-styled"
        placeholder={translateBase(BaseLocaleKey.ScheduleFilterByName)}
        termAtom={termAtom}
      />
      <ModalHeader>{translateBase(BaseLocaleKey.SchedulePhotosLocal)}</ModalHeader>
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
