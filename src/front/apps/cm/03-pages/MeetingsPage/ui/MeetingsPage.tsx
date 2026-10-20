import { translateBase } from '#basis/locale';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { CmMeetingSchPackFace } from '$cm/entities/meeting';
import { indexIDB } from '$index/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const CmMeetingsPage = () => {
  const schedules = useLiveQuery(() => indexIDB.db.schs.toArray());

  return (
    <PageContainerConfigurer
      className="meetings-container"
      headTitle={translateBase(BaseLocaleKey.Events)}
      content={
        <>
          {schedules?.map(schedule => (
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
