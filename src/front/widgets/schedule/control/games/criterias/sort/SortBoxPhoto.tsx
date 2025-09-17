import { ScheduleWidgetUserTakePhoto } from '#widgets/schedule/control/users/TakePhoto';
import { ScheduleWidgetUserPhoto } from '#widgets/schedule/control/users/UserPhoto';
import { IScheduleWidgetUser } from 'shared/api';
import styled from 'styled-components';

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
      <StyledPhotoArea className="flex center h-full pointer">
        <ScheduleWidgetUserPhoto
          className="w-full"
          user={user}
          or={
            <StyledPhotoArea className="flex center border">
              <ScheduleWidgetUserTakePhoto user={user} />
            </StyledPhotoArea>
          }
        />
      </StyledPhotoArea>
    </div>
  );
};

const StyledPhotoArea = styled.div`
  min-height: 300px;
  max-width: 47vw;
  width: 200px;

  .border {
    border: solid var(--color--4) 1px;
  }
`;
