import { ServerTSJRPCTool } from 'back/tsjrpc.base.server';
import { IScheduleWidget, IScheduleWidgetDay, ScheduleDayScopeProps, ScheduleScopeProps } from 'shared/api';
import { schedulesFileStore } from './file-stores';
import { scheduleTgInformer } from './tg-bot-inform/tg-inform';
import { schServerTsjrpcShareMethods } from './tsjrpc.shares';

export const modifySchedule =
  <Props extends { props: ScheduleScopeProps }>(
    isNeedRefreshTgInformTime: boolean,
    modifier: (sch: IScheduleWidget, props: Props, tool: ServerTSJRPCTool) => void,
  ) =>
  async (props: Props, tool: ServerTSJRPCTool) => {
    const sch = schedulesFileStore.getValue().find(sch => sch.w === props.props.schw);
    if (sch === undefined) throw new Error('schedule not found');

    modifier(sch, props, tool);
    sch.m = Date.now() + Math.random();
    schedulesFileStore.saveValue();

    schServerTsjrpcShareMethods.editedSchedule({ sch });
    if (isNeedRefreshTgInformTime) scheduleTgInformer.inform(sch.w);

    return sch;
  };

export const modifyScheduleDay = <Props extends { props: ScheduleDayScopeProps }>(
  isNeedRefreshTgInformTime: boolean,
  modifier: (day: IScheduleWidgetDay, props: Props, sch: IScheduleWidget, tool: ServerTSJRPCTool) => void,
) =>
  modifySchedule<Props>(isNeedRefreshTgInformTime, (sch, props, tool) => {
    const day = sch.days[props.props.dayi];
    if (day == null) throw new Error('day not found');
    modifier(day, props, sch, tool);
  });
