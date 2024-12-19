import { mylib } from 'front/utils';
import { useEffect, useState } from 'react';
import { IScheduleWidget, IScheduleWidgetWid } from 'shared/api';
import { useIndexSchedules } from '../../../components/index/molecules';
import serviceMaster from '../../service/serviceMaster';

export const useGetScheduleOrPull = (scheduleInstance: string | IScheduleWidgetWid | NaN) => {
  const [schedule, setSchedule] = useState<IScheduleWidget | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const schedules = useIndexSchedules();
  const [error, setError] = useState('');

  useEffect(() => {
    if (!mylib.isStr(scheduleInstance) && isNaN(scheduleInstance)) return;

    const find = mylib.isStr(scheduleInstance)
      ? (sch: IScheduleWidget) => sch.tgChatReqs?.endsWith(scheduleInstance)
      : (sch: IScheduleWidget) => sch.w === scheduleInstance;

    const schedule = schedules.list.find(find);

    if (schedule !== undefined) {
      setSchedule(schedule);
      return;
    }

    return hookEffectLine()
      .setTimeout(async () => {
        setIsLoading?.(true);

        try {
          setSchedule(await serviceMaster('index')('takeDaySchedule', scheduleInstance));
        } catch (error) {
          setError('' + error);
        }

        setIsLoading?.(false);
      }, 600)
      .effect();
  }, [scheduleInstance, schedules.list, setIsLoading, setSchedule]);

  return { schedule, isLoading, error } as const;
};
