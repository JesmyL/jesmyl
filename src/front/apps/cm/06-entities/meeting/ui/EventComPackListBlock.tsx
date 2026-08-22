import { CmComFaceList } from '$cm/ext';
import { IScheduleWidget, ScheduleWidgetDayEventMi, ScheduleWidgetDayi } from 'shared/api';
import { useCmMeetingComwList } from '../lib/useCmMeetingComwList';
import { CmMeetingControls } from './Controls';
import { CmMeetingEventModLabel } from './ModLabel';

export const CmMeetingEventComPackListBlock = ({
  eventMi,
  sch,
  dayi,
}: {
  eventMi: ScheduleWidgetDayEventMi;
  sch: IScheduleWidget;
  dayi: ScheduleWidgetDayi;
}) => {
  const pack = useCmMeetingComwList({ schw: sch.w, dayi, eventMi });

  return (
    <>
      <div className="flex flex-end">
        <CmMeetingControls
          comws={pack.s}
          dayi={dayi}
          eventMi={eventMi}
          schw={sch.w}
        />
      </div>

      <CmComFaceList list={pack.s} />
      <CmMeetingEventModLabel mod={pack.w} />
    </>
  );
};
