import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { getScheduleWidgetUserPhotoStorageKey } from '#widgets/schedule/storage';
import { indexIDB } from '$index/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { IScheduleWidgetUser } from 'shared/api';
import { twMerge } from 'tailwind-merge';

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
        <img
          src={src}
          alt=""
          className={twMerge('max-h-full max-w-full', className)}
        />
      ) : (
        or
      )}
    </>
  );
}
