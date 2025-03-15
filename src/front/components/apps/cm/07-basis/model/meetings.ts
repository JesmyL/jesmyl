import { ScheduleDayEventPathProps } from '#widgets/schedule/ScheduleWidget.model';

export type CmMeetingToEventLinkRender = (props: {
  children: React.ReactNode;
  search: ScheduleDayEventPathProps;
}) => React.ReactNode;
