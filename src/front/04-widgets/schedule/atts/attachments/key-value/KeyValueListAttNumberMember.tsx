import IconButton from '#shared/ui/the-icon/IconButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { CustomAttUseTaleId, ScheduleWidgetCleans } from 'shared/api';
import ScheduleWidgetRoleFace from '../../../control/roles/RoleFace';
import ScheduleWidgetListUnitFace from '../../../lists/UnitFace';
import { extractScheduleWidgetRole, useScheduleWidgetRightsContext } from '../../../useScheduleWidget';

export default function KeyValueListAttNumberMember({ value }: { value: number }) {
  const rights = useScheduleWidgetRightsContext();

  if (ScheduleWidgetCleans.checkIsTaleIdUnit(value, CustomAttUseTaleId.Roles)) {
    const role = extractScheduleWidgetRole(rights.schedule, value);
    return (
      <ScheduleWidgetRoleFace
        role={role}
        schedule={rights.schedule}
      />
    );
  } else if (ScheduleWidgetCleans.checkIsTaleIdUnit(value, CustomAttUseTaleId.Lists)) {
    return <ScheduleWidgetListUnitFace unitMi={Math.trunc(value)} />;
  } else if (ScheduleWidgetCleans.checkIsTaleIdUnit(value, CustomAttUseTaleId.Users)) {
    const userMi = Math.trunc(value);
    const user = rights.schedule.ctrl.users.find(user => user.mi === userMi);
    return user === undefined ? (
      <div className="color--ko">Участник не найден</div>
    ) : (
      <div className="color--3 flex flex-gap">
        <LazyIcon icon="User" />
        {user.fio || user.nick}
      </div>
    );
  } else if (ScheduleWidgetCleans.checkIsTaleIdUnit(value, CustomAttUseTaleId.Games)) {
    const gameMi = Math.trunc(value);
    const game = rights.schedule.games?.list.find(game => game.mi === gameMi);

    return game === undefined ? (
      <div className="color--ko">Ком. игра не найдена</div>
    ) : (
      <div className="color--3 flex flex-gap">
        <LazyIcon icon="Basketball01" />
        {game.title}
      </div>
    );
  }

  return (
    <IconButton
      icon="HelpSquare"
      postfix={<span className="color--ko">Неизвестный пункт</span>}
    />
  );
}
