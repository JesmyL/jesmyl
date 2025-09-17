import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { ScheduleWidgetRoleFace } from '#widgets/schedule/control/roles/RoleFace';
import { ScheduleWidgetListUnitFace } from '#widgets/schedule/lists/UnitFace';
import { extractScheduleWidgetRole } from '#widgets/schedule/useScheduleWidget';
import { CustomAttUseTaleId, ScheduleWidgetCleans } from 'shared/api';

export function KeyValueListAttNumberMember({ value }: { value: number }) {
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
      <div className="text-xKO">Участник не найден</div>
    ) : (
      <div className="text-x3 flex gap-2">
        <LazyIcon icon="User" />
        {user.fio || user.nick}
      </div>
    );
  } else if (ScheduleWidgetCleans.checkIsTaleIdUnit(value, CustomAttUseTaleId.Games)) {
    const gameMi = Math.trunc(value);
    const game = rights.schedule.games?.list.find(game => game.mi === gameMi);

    return game === undefined ? (
      <div className="text-xKO">Ком. игра не найдена</div>
    ) : (
      <div className="text-x3 flex gap-2">
        <LazyIcon icon="Basketball01" />
        {game.title}
      </div>
    );
  }

  return (
    <TheIconButton
      icon="HelpSquare"
      postfix={<span className="text-xKO">Неизвестный пункт</span>}
    />
  );
}
