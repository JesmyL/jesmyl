import { useMemo } from 'react';
import {
  CmComBindAttach,
  IScheduleWidget,
  IScheduleWidgetDay,
  IScheduleWidgetDayEvent,
  ScheduleWidgetCleans,
} from 'shared/api';
import { itNUnd } from 'shared/utils';
import { CmComListContext, CmComListContextValue } from '../../../base/translations/context';
import { Com } from '../../../col/com/Com';
import { useComs } from '../../../cols/useCols';
import { Meetings } from '../../../lists/meetings/Meetings';
import { useMeetings } from '../../../lists/meetings/useMeetings';

interface Props {
  schedule?: IScheduleWidget | nil;
  children?: React.ReactNode;
}

const findEventWithComs = (event: IScheduleWidgetDayEvent) => event.atts?.['[cm]:coms'] != null;
const findDayWithComs = (day: IScheduleWidgetDay) => day.list.some(findEventWithComs);

export const ScheduleWidgetCurrentCmTranslationList = ({ schedule, children }: Props) => {
  const meetings = useMeetings().meetings;

  if (meetings == null || schedule == null || schedule.days.length === 0) return children;

  return <Component {...{ meetings, schedule, children }} />;
};

const Component = ({
  schedule,
  meetings,
  children,
}: {
  schedule: IScheduleWidget;
  meetings: Meetings;
  children: React.ReactNode;
}) => {
  const allComs = useComs();
  const value = useMemo((): CmComListContextValue => {
    let coms: Com[] | null = null;
    const titles: Record<number, string> = {};

    const dayi = ScheduleWidgetCleans.getCurrentDayi(schedule);
    const getValue = (event: IScheduleWidgetDayEvent | und): Com[] => {
      if (event?.atts?.['[cm]:coms'] != null) {
        const { comws, eventw } = event.atts['[cm]:coms'] as Partial<CmComBindAttach>;
        let coms: Com[] = [];

        if (eventw !== undefined) {
          const meeting = meetings.events?.find(event => event.wid === eventw);
          coms = coms.concat(meeting?.coms ?? []);
        }

        if (comws !== undefined) {
          coms = coms.concat(comws.map(comw => allComs.find(com => com.wid === comw)).filter(itNUnd));
        }

        return coms;
      }

      return [];
    };

    if (dayi < 0) {
      coms = getValue(schedule.days.find(findDayWithComs)?.list.find(findEventWithComs));
    } else {
      const today = schedule.days[dayi];

      if (today != null) {
        const event = ScheduleWidgetCleans.getCurrentEventInDay(schedule, dayi);

        if (event?.atts?.['[cm]:coms'] == null) {
          coms = [];

          today.list.filter(findEventWithComs).forEach(event => {
            if (coms === null) return;

            titles[coms.length] =
              (schedule.types[event.type]?.title ?? 'Событие') + (event.topic ? `: ${event.topic}` : '');

            coms = coms.concat(getValue(event));
          });
        } else coms = getValue(event);
      } else coms = getValue(schedule.days.findLast(findDayWithComs)?.list.find(findEventWithComs));
    }

    return {
      list: coms,
      titles,
    };
  }, [allComs, meetings.events, schedule]);

  return <CmComListContext.Provider value={value}>{children}</CmComListContext.Provider>;
};
