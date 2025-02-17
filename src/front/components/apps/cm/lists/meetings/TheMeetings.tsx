import { useLiveQuery } from 'dexie-react-hooks';
import { indexIDB } from 'front/components/index/db/index-idb';
import { Route, Routes } from 'react-router-dom';
import PhaseContainerConfigurer from '../../../../../07-shared/ui/phase-container/PhaseContainerConfigurer';
import { MeetingSchPackFace } from './MeetingSchPackFace';
import TheMeetingsEvent from './TheMeetingsEvent';

export const TheMeetings = () => {
  return (
    <Routes>
      <Route
        index
        element={<Page />}
      />

      <Route
        path=":schw/:dayi/:eventMi/*"
        element={<TheMeetingsEvent />}
      />
    </Routes>
  );
};

const Page = () => {
  const schedules = useLiveQuery(() => indexIDB.db.schs.toArray());

  return (
    <PhaseContainerConfigurer
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
