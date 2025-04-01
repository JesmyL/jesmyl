import { IScheduleWidget, IScheduleWidgetDay, ScheduleDayScopeProps, ScheduleScopeProps } from 'shared/api';
import { schedulesFileStore } from './file-stores';
import { schServerInvocatorShareMethods } from './invocators.shares';
import { scheduleTgInformer } from './tg-bot-inform/tg-inform';

export const modifySchedule = async (
  isNeedRefreshTgInformTime: boolean,
  { schw }: ScheduleScopeProps,
  modifier: (sch: IScheduleWidget) => void,
) => {
  const sch = schedulesFileStore.getValue().find(sch => sch.w === schw);
  if (sch === undefined) throw new Error('schedule not found');

  modifier(sch);
  sch.m = Date.now() + Math.random();
  schedulesFileStore.saveValue();

  schServerInvocatorShareMethods.editedSchedule({ sch });
  if (isNeedRefreshTgInformTime) scheduleTgInformer.inform(sch.w);

  return sch;
};

export const modifyScheduleDay =
  <Value>(
    isNeedRefreshTgInformTime: boolean,
    modifier: (day: IScheduleWidgetDay, value: Value, sch: IScheduleWidget) => void,
  ) =>
  ({ props, value }: { props: ScheduleDayScopeProps; value: Value }) =>
    modifySchedule(isNeedRefreshTgInformTime, props, sch => {
      const day = sch.days[props.dayi];
      if (day == null) throw new Error('day not found');
      modifier(day, value, sch);
    });
