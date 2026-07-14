import { scheduleDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { eq } from 'drizzle-orm';
import { IScheduleWidget, IScheduleWidgetWid } from 'shared/api';
import { checkIsNotUndefined } from 'shared/utils/checkIs';

const tinyDict: PRecord<IScheduleWidgetWid, Tiny | null> = {};
type Tiny = IScheduleWidget;

export const resetScheduleWidgetTiny = async (schw: RKey<IScheduleWidgetWid>) => {
  delete tinyDict[schw];
};

export const takeScheduleWidgetTiny = async (schw: RKey<IScheduleWidgetWid>) => {
  if (checkIsNotUndefined(tinyDict[schw])) return tinyDict[schw];

  const tiny = (await db.select().from(scheduleDB).where(eq(scheduleDB.w, +schw)).limit(1)).at(0);

  return (tinyDict[schw] = tiny ? tiny : null);
};
