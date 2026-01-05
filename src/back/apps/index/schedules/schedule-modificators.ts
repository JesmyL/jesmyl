import { ServerTSJRPCTool } from 'back/tsjrpc.base.server';
import { IScheduleWidget, IScheduleWidgetDay, ScheduleDayScopeProps, ScheduleScopeProps } from 'shared/api';
import { schedulesDirStore } from './file-stores';
import { scheduleTgInformer } from './tg-bot-inform/tg-inform';
import { schServerTsjrpcShareMethods } from './tsjrpc.shares';

export const modifySchedule =
  <Props extends { props: ScheduleScopeProps }>(
    isNeedRefreshTgInformTime: boolean,
    modifier: (sch: IScheduleWidget, props: Props, tool: ServerTSJRPCTool) => string | null,
  ) =>
  async (props: Props, tool: ServerTSJRPCTool) => {
    const sch = schedulesDirStore.getItem(props.props.schw);
    if (sch == null) throw new Error('schedule not found');

    const description = modifier(sch, props, tool);
    sch.m = Date.now();
    schedulesDirStore.saveItem(sch.w);

    schServerTsjrpcShareMethods.editedSchedule({ sch }, null);
    if (isNeedRefreshTgInformTime) scheduleTgInformer.inform(sch.w);

    return { value: sch, description };
  };

export const modifyScheduleDay = <Props extends { props: ScheduleDayScopeProps }>(
  isNeedRefreshTgInformTime: boolean,
  modifier: (day: IScheduleWidgetDay, props: Props, sch: IScheduleWidget, tool: ServerTSJRPCTool) => string | null,
) =>
  modifySchedule<Props>(isNeedRefreshTgInformTime, (sch, props, tool) => {
    const day = sch.days[props.props.dayi];
    if (day == null) throw new Error('day not found');
    return modifier(day, props, sch, tool);
  });
