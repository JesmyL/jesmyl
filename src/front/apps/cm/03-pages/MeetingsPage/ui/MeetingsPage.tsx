import { translateBase } from '#basis/locale';
import { RemoteControlConnectItem } from '#features/broadcast/remote/RemoteControlConnectItem';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { CmMeetingSchPackFace } from '$cm/entities/meeting';
import { indexIDB } from '$index/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo, useState } from 'react';
import { ScheduleWidgetWid } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const CmMeetingsPage = ({ schw }: { schw?: ScheduleWidgetWid }) => {
  const schedules = useLiveQuery(() => indexIDB.db.schs.toArray());
  const visibleSchedules = useMemo(
    () => (schw ? schedules?.filter(schedule => schedule.w === schw) : schedules),
    [schedules, schw],
  );
  const [isOpenTools, setIsOpenTools] = useState(false);

  return (
    <PageContainerConfigurer
      className="meetings-container"
      headTitle={translateBase(BaseLocaleKey.Events)}
      onMoreClick={setIsOpenTools}
      content={
        <>
          {isOpenTools && (
            <BottomPopup onClose={setIsOpenTools}>
              <RemoteControlConnectItem schw={schw ?? null} />
            </BottomPopup>
          )}
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
