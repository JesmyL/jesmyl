import { scheduleDB } from 'back/drizzle.schema';
import { dbUpdate } from 'back/drizzle/drizzle.db';
import { ServerTSJRPCTool } from 'back/tsjrpc.base.server';
import { eq } from 'drizzle-orm';
import { IScheduleWidget, IScheduleWidgetDay, ScheduleDayScopeProps, ScheduleScopeProps } from 'shared/api';
import { Bool } from 'shared/enums';
import { checkIsEq } from 'shared/utils/checkIsEq';
import { deepClone } from 'shared/utils/clone';
import { objectKeys, objectLength } from 'shared/utils/object.utils';
import { takeScheduleWidgetTiny } from './schedule.tiny';
import { scheduleTgInformer } from './tg-bot-inform/tg-inform';
import { schServerTsjrpcShareMethods } from './tsjrpc.shares';

export const modifySchedule =
  <Props extends { props: ScheduleScopeProps }>(
    isNeedRefreshTgInformTime: boolean,
    modifier: (sch: IScheduleWidget, props: Props, tool: ServerTSJRPCTool) => PromiseOr<string | null>,
  ) =>
  async (props: Props, tool: ServerTSJRPCTool) => {
    const sch = await takeScheduleWidgetTiny(props.props.schw);
    if (!sch) throw new Error('schedule not found');
    const clone = deepClone(sch);

    const description = await modifier(sch, props, tool);

    const updates: Partial<IScheduleWidget> = {};
    const uncheckedKeysSet = new Set<keyof typeof sch>(['w', 'm']);

    objectKeys({ ...sch, ...clone }).forEach(key => {
      if (key === 'id' || uncheckedKeysSet.has(key) || checkIsEq(clone[key], sch[key])) return;

      updates[key] = (sch[key] ?? null) as never;
    });

    if (objectLength(updates)) {
      const mod = Date.now();

      await dbUpdate(
        scheduleDB,
        {
          ...updates,
          isRemoved: updates.isRemoved ? Bool.True : Bool.False,
          withTech: updates.withTech ? Bool.True : Bool.False,
          tgInform: updates.tgInform === 0 ? Bool.False : Bool.True,
          tgChatReqs: updates.tgChatReqs || '',
          m: mod,
        },
        eq(scheduleDB.w, props.props.schw),
      );

      schServerTsjrpcShareMethods.editedSchedule({ sch, mod }, null);
      if (isNeedRefreshTgInformTime) scheduleTgInformer.inform(sch.w);
    }

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
