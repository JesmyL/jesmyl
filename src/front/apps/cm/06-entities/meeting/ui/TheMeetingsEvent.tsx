import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { Accordion } from '#shared/components';
import { isMobileDevice } from '#shared/lib/device-differences';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { ScheduleWidgetWatchLiveBroadcastButton } from '#widgets/schedule/live-broadcast/WatchLiveButton';
import { ScheduleDayEventPathProps } from '#widgets/schedule/ScheduleWidget.model';
import { indexIDB } from '$index/shared/state';
import { Link } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCmMeetingEventParticipants } from '../lib/useCmMeetingEventParticipants';
import { CmMeetingEventListAccordion } from './ListAccordion';

export const CmMeetingEvent = ({ dayi, eventMi, schw }: ScheduleDayEventPathProps) => {
  const schedule = useLiveQuery(() => indexIDB.db.schs.get(schw), [schw]);
  const { content, controls, headTitle, eventBoxes, isOnlyDay } = useCmMeetingEventParticipants(schedule, dayi);

  if (!schedule) return;

  return (
    <PageContainerConfigurer
      className="meeting-container"
      headTitle={headTitle}
      backButtonRender={(linkRef, children) => (
        <Link
          ref={linkRef}
          to="."
          search={prev => ({
            ...prev,
            dayi: undefined,
            eventMi: undefined,
            attKey: undefined,
          })}
        >
          {children}
        </Link>
      )}
      head={
        <div className="flex gap-2">
          {isMobileDevice && <ScheduleWidgetWatchLiveBroadcastButton schw={schw} />}
          {controls}
        </div>
      }
      content={
        <AppDialogProvider title="cm-meeting-event-coms">
          <Accordion.Root
            type="single"
            collapsible
            value={`${dayi}/${eventMi}`}
          >
            {content ??
              eventBoxes?.map(({ dayi, events }) => {
                return events.map(event => (
                  <CmMeetingEventListAccordion
                    key={`${dayi}/${event.mi}`}
                    dayi={dayi}
                    eventMi={event.mi}
                    sch={schedule}
                    evTopic={event.topic}
                    evType={event.type}
                    isOnlyDay={isOnlyDay}
                  />
                ));
              })}
          </Accordion.Root>
        </AppDialogProvider>
      }
    />
  );
};
