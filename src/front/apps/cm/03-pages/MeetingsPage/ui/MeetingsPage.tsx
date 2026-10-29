import { translateBase } from '#basis/locale';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { CmMeetingSchPackFace } from '$cm/entities/meeting';
import { indexIDB } from '$index/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { ScheduleWidgetWid } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const CmMeetingsPage = ({ schw }: { schw?: ScheduleWidgetWid }) => {
  const schedules = useLiveQuery(() => indexIDB.db.schs.toArray());
  const visibleSchedules = useMemo(
    () => (schw ? schedules?.filter(schedule => schedule.w === schw) : schedules),
    [schedules, schw],
  );

  return (
    <PageContainerConfigurer
      className="meetings-container"
      headTitle={translateBase(BaseLocaleKey.Events)}
      content={
        <>
          {visibleSchedules?.map(schedule => (
            <CmMeetingSchPackFace
              key={schedule.w}
              schedule={schedule}
            />
          ))}
        </>
      }
    />
  );
};
