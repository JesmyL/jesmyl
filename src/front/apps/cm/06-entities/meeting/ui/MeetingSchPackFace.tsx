import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { IScheduleWidget, ScheduleWidgetDayi } from 'shared/api';
import { cmMeetingLastOpenEventMiAtom } from '../state/atoms';

export const CmMeetingSchPackFace = ({ schedule }: { schedule: IScheduleWidget }) => {
  const lastOpenEventMi = useAtomValue(cmMeetingLastOpenEventMiAtom);
  const eventBoxes = schedule.days.flatMap((day, dayi) => {
    const events = day.list.filter(event => event.atts?.['[cm]:coms']);

    return events.length ? [{ dayi: dayi as ScheduleWidgetDayi, events }] : [];
  });
  const firstEventBox = eventBoxes.at(0);
  const firstEvent = firstEventBox?.events.at(0);

  if (!firstEvent || !firstEventBox) return;
  const [dayi = firstEventBox.dayi, eventMi = firstEvent.mi] = lastOpenEventMi[schedule.w] ?? [];
  const isOnlyEvent = eventBoxes.length < 2 && firstEventBox.events.length < 2;

  return (
    <>
      <Link
        to="."
        search={prev => ({
          ...(prev as object),
          dayi,
          eventMi,
          schw: schedule.w,
        })}
      >
        <BrutalItem
          iconNode={<LazyIcon icon="Calendar02" />}
          title={schedule.title}
          description={isOnlyEvent && schedule.types[firstEvent.type]?.title}
          onClick={
            isOnlyEvent
              ? undefined
              : () => cmMeetingLastOpenEventMiAtom.do.update(dict => (dict[schedule.w] ??= [dayi, eventMi]))
          }
        />
      </Link>
    </>
  );
};
