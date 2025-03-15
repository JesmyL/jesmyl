import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { indexIDB } from '$index/db/index-idb';
import { useLiveQuery } from 'dexie-react-hooks';
import { MeetingSchPackFace } from '../lists/meetings/MeetingSchPackFace';

export const CmMeetingsPage = () => {
  const schedules = useLiveQuery(() => indexIDB.db.schs.toArray());

  return (
    <PageContainerConfigurer
      className="meetings-container"
      headTitle="События"
      content={
        <>
          {schedules?.map(schedule => (
            <MeetingSchPackFace
              key={schedule.w}
              schedule={schedule}
            />
          ))}
        </>
      }
    />
  );
};
