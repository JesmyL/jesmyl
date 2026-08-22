import { CmComFaceList, cmIDB } from '$cm/ext';
import { useLiveQuery } from 'dexie-react-hooks';
import { IScheduleWidget, ScheduleWidgetDayi } from 'shared/api';
import { CmMeetingControls } from '../ui/Controls';
import { CmMeetingEventModLabel } from '../ui/ModLabel';

export const useCmMeetingEventParticipants = (schedule: IScheduleWidget | nil, dayi: ScheduleWidgetDayi) => {
  const schw = schedule?.w;
  const dayiSet = new Set();

  const eventBoxes = schedule?.days.flatMap((day, dayi) => {
    const events = day.list.filter(event => event.atts?.['[cm]:coms']);

    if (events.length) {
      dayiSet.add(dayi);
      return [{ dayi: dayi as ScheduleWidgetDayi, events }];
    }
    return [];
  });
  const isOnlyEvent = (eventBoxes?.length ?? 0) < 2 && (eventBoxes?.at(0)?.events.length ?? 0) < 2;

  const pack = useLiveQuery(
    () => (isOnlyEvent && schw ? cmIDB.db.scheduleComws.get({ schw }) : undefined),
    [schw, isOnlyEvent],
  );

  let controls, content;
  let headTitle: React.ReactNode = schedule?.title;

  if (isOnlyEvent && schw) {
    const firstEvent = eventBoxes?.at(0)?.events.at(0);
    const eventPack = firstEvent && pack?.pack[dayi]?.[firstEvent.mi];

    if (eventPack) {
      controls = (
        <div className="flex gap-3 pr-3">
          {eventPack && (
            <CmMeetingControls
              comws={eventPack.s}
              dayi={dayi}
              eventMi={firstEvent.mi}
              schw={schw}
            />
          )}
        </div>
      );

      content = eventPack && (
        <>
          <CmComFaceList list={eventPack.s} />
          <CmMeetingEventModLabel mod={eventPack.w} />
        </>
      );

      headTitle = (
        <>
          {headTitle} - {schedule.types[firstEvent.type].title}
        </>
      );
    }
  }

  return { controls, content, headTitle, eventBoxes, isOnlyDay: dayiSet.size > 1 };
};
