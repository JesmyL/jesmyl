import { useLiveQuery } from 'dexie-react-hooks';
import { FullContent } from 'front/complect/fullscreen-content/FullContent';
import { indexIDB } from 'front/components/index/db/index-idb';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PhaseContainerConfigurer from '../../../../../complect/phase-container/PhaseContainerConfigurer';
import MeetingEventExpandList from './MeetingEventExpandList';
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
  const [isOpenFullContent, setIsOpenFullContent] = useState(false);

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

          {isOpenFullContent && (
            <FullContent onClose={setIsOpenFullContent}>
              <MeetingEventExpandList />
            </FullContent>
          )}
        </>
      }
    />
  );
};
