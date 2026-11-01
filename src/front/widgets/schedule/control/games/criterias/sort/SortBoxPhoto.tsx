import { ScheduleWidgetUserTakePhoto } from '#widgets/schedule/control/users/TakePhoto';
import { ScheduleWidgetUserPhoto } from '#widgets/schedule/control/users/UserPhoto';
import { IScheduleWidgetUser } from 'shared/api';

const photoAreaClassName = 'flex center min-h-[300px] w-[200px] max-w-[47vw]';

interface Props {
  user: IScheduleWidgetUser;
  onClick: () => void;
}

export const ScheduleWidgetTeamsCriteriaSorterScreenSortBoxPhoto = function SortBoxPhoto({ onClick, user }: Props) {
  return (
    <div
      className="h-full"
      onClick={onClick}
    >
      <div className={photoAreaClassName + ' h-full pointer'}>
        <ScheduleWidgetUserPhoto
          className="w-full"
          user={user}
          or={
            <div className={photoAreaClassName + ' border border-x4'}>
              <ScheduleWidgetUserTakePhoto user={user} />
            </div>
          }
        />
      </div>
    </div>
  );
};
