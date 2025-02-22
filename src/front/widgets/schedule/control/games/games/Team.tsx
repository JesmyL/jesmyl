import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/useScheduleWidget';
import { IScheduleWidgetTeam } from 'shared/api';

interface Props {
  team: IScheduleWidgetTeam;
}

export function ScheduleWidgetTeamGameTeam({ team }: Props) {
  const rights = useScheduleWidgetRightsContext();

  return (
    <div key={team.mi}>
      <ExpandableContent title={<h3>{team.title}</h3>}>
        {team.users.map(({ mi }) => {
          const user = rights.schedule.ctrl.users.find(user => user.mi === mi);

          if (user === undefined) return null;

          return <div key={mi}>{user.fio}</div>;
        })}
      </ExpandableContent>
    </div>
  );
}
