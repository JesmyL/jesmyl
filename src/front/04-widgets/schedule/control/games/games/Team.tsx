import { ExpandableContent } from 'front/08-shared/ui/expand/ExpandableContent';
import { IScheduleWidgetTeam } from 'shared/api';
import { useScheduleWidgetRightsContext } from '../../../useScheduleWidget';

interface Props {
  team: IScheduleWidgetTeam;
}

export default function ScheduleWidgetTeamGameTeam({ team }: Props) {
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
