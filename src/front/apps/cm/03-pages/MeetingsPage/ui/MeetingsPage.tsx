import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { CmMeetingSchPackFace } from '$cm/entities/meeting';
import { indexIDB } from '$index/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';

export const CmMeetingsPage = () => {
  const schedules = useLiveQuery(() => indexIDB.db.schs.toArray());

  return (
    <PageContainerConfigurer
      className="meetings-container"
      headTitle="События"
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
