import { useParams } from 'react-router-dom';
import { IScheduleWidgetDayEventMi, IScheduleWidgetWid } from 'shared/api';

export const useMeetingPathParts = () => {
  const params = useParams();
  const dayi = +params.dayi! as IScheduleWidgetWid | NaN;
  const schw = +params.schw! as number | NaN;
  const eventMi = +params.eventMi! as IScheduleWidgetDayEventMi | NaN;

  return { schw, dayi, eventMi };
};
