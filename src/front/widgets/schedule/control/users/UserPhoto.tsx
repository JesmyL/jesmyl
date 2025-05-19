import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { getScheduleWidgetUserPhotoStorageKey } from '#widgets/schedule/storage';
import { indexIDB } from '$index/db/index-idb';
import { useLiveQuery } from 'dexie-react-hooks';
import { IScheduleWidgetUser } from 'shared/api';
import styled from 'styled-components';

interface Props {
  user: IScheduleWidgetUser;
  justRenderItOnEmpty?: React.ReactNode;
  or?: React.ReactNode;
  className?: string;
}

export function ScheduleWidgetUserPhoto({ user, justRenderItOnEmpty, className, or }: Props) {
  const rights = useScheduleWidgetRightsContext();
  const src = useLiveQuery(() =>
    indexIDB.db.schedulePhotos.get(getScheduleWidgetUserPhotoStorageKey(user, rights.schedule)),
  )?.src;

  if (justRenderItOnEmpty !== undefined) {
    return <>{!src ? justRenderItOnEmpty : or}</>;
  }

  return (
    <>
      {src ? (
        <StyledImg
          src={src}
          alt=""
          className={className}
        />
      ) : (
        or
      )}
    </>
  );
}

const StyledImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
