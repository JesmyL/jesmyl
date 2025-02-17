import { useLiveQuery } from 'dexie-react-hooks';
import { indexIDB } from 'front/components/index/db/index-idb';
import { IScheduleWidgetUser } from 'shared/api';
import styled from 'styled-components';
import { getScheduleWidgetUserPhotoStorageKey } from '../../storage';
import { useScheduleWidgetRightsContext } from '../../useScheduleWidget';

interface Props {
  user: IScheduleWidgetUser;
  justRenderItOnEmpty?: React.ReactNode;
  or?: React.ReactNode;
  className?: string;
}

export default function ScheduleWidgetUserPhoto({ user, justRenderItOnEmpty, className, or }: Props) {
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
