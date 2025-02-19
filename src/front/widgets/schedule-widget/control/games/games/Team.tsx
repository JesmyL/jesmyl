import { IScheduleWidgetTeam } from 'shared/api';
import { ExpandableContent } from '../../../../../shared/ui/expand/ExpandableContent';
import { useScheduleWidgetRightsContext } from '../../../useScheduleWidget';

interface Props {
  team: IScheduleWidgetTeam;
}

export const ScheduleWidgetTeamGameTeam = ({ team }: Props) => {
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
};
