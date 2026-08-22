import { translateBase } from '#basis/locale';
import { Accordion } from '#shared/components';
import { useNavigate } from '@tanstack/react-router';
import { ReactNode } from 'react';
import { IScheduleWidget, ScheduleWidgetDayEventMi, ScheduleWidgetDayi } from 'shared/api';
import { cmMeetingLastOpenEventMiAtom } from '../state/atoms';
import { CmMeetingEventComPackListBlock } from './EventComPackListBlock';

export const CmMeetingEventListAccordion = ({
  dayi,
  eventMi,
  sch,
  isOnlyDay,
  evTopic,
  evType,
}: {
  eventMi: ScheduleWidgetDayEventMi;
  sch: IScheduleWidget;
  dayi: ScheduleWidgetDayi;
  isOnlyDay: boolean;
  evType: number;
  evTopic: ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <Accordion.Item value={`${dayi}/${eventMi}`}>
      <Accordion.Trigger
        onClick={() => {
          const schw = sch.w;

          cmMeetingLastOpenEventMiAtom.do.update(dict => (dict[schw] = [dayi, eventMi]));
          navigate({ to: '.', search: { schw, eventMi, dayi } });
        }}
      >
        <span>
          {isOnlyDay && <>{translateBase(it => it.NDay, { n: dayi + 1 })} </>}
          <span className="text-x7">{sch.types[evType].title}</span>
          {evTopic && <>: {evTopic}</>}
        </span>
      </Accordion.Trigger>
      <Accordion.Content>
        <CmMeetingEventComPackListBlock
          eventMi={eventMi}
          sch={sch}
          dayi={dayi}
        />
      </Accordion.Content>
    </Accordion.Item>
  );
};
