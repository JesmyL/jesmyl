import { atom, useAtom } from '#shared/lib/atom';
import { mylib } from '#shared/lib/my-lib';
import { useIndexSchedules } from '$index/atoms';
import { useEffect, useState } from 'react';
import { IScheduleWidget, IScheduleWidgetWid } from 'shared/api';

const scheduleAtom = atom<IScheduleWidget | null>(null);

export const useGetScheduleOrPull = (scheduleInstance: string | IScheduleWidgetWid | NaN) => {
  const [schedule, setSchedule] = useAtom(scheduleAtom);
  const [isLoading, setIsLoading] = useState(true);
  const schedules = useIndexSchedules();
  const [error, setError] = useState('');

  useEffect(() => {
    if (!mylib.isStr(scheduleInstance) && isNaN(scheduleInstance)) return;

    const find = mylib.isStr(scheduleInstance)
      ? (sch: IScheduleWidget) => sch.tgChatReqs?.endsWith(scheduleInstance)
      : (sch: IScheduleWidget) => sch.w === scheduleInstance;

    const schedule = schedules?.find(find);

    if (schedule !== undefined) {
      setSchedule(schedule);
      setIsLoading(false);
      return;
    }

    return hookEffectLine()
      .setTimeout(async () => {
        setIsLoading(true);

        try {
          // setSchedule(await serviceMaster('index')('takeDaySchedule', scheduleInstance));
        } catch (error) {
          setError('' + error);
        }

        setIsLoading(false);
      }, 600)
      .effect();
  }, [scheduleInstance, schedules, setSchedule]);

  return { schedule, isLoading, error } as const;
};
