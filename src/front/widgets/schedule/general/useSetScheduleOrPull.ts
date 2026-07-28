import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { useIndexSchedules } from '$index/shared/state';
import { Atom, atom, useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { IScheduleWidget, ScheduleWidgetWid } from 'shared/api';
import { checkIsString } from 'shared/utils/checkIs';

let scheduleAtom: Atom<IScheduleWidget | null>;

export const useGetScheduleOrPull = (scheduleInstance: string | ScheduleWidgetWid | NaN) => {
  scheduleAtom ??= atom<IScheduleWidget | null>(null);

  const schedule = useAtomValue(scheduleAtom);
  const [isLoading, setIsLoading] = useState(true);
  const schedules = useIndexSchedules();
  const [error, setError] = useState('');

  useEffect(() => {
    if (!checkIsString(scheduleInstance) && isNaN(scheduleInstance)) return;

    const find = checkIsString(scheduleInstance)
      ? (sch: IScheduleWidget) => sch.tgChatReqs?.endsWith(scheduleInstance)
      : (sch: IScheduleWidget) => sch.w === scheduleInstance;

    const schedule = schedules?.find(find);

    if (schedule !== undefined) {
      scheduleAtom.set(schedule);
      setIsLoading(false);
      return;
    }

    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(async () => {
          setIsLoading(true);

          try {
            // setSchedule(await serviceMaster('index')('takeDaySchedule', scheduleInstance));
          } catch (error) {
            setError('' + error);
          }

          setIsLoading(false);
        }, 600),
      )
      .effect();
  }, [scheduleInstance, schedules]);

  return { schedule, isLoading, error } as const;
};
