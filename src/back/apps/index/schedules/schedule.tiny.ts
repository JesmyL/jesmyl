import { scheduleDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { tinyMakerGenerator } from 'back/drizzle/ex/tinyMaker';
import { SchId } from 'back/drizzle/schema/schedule';
import { IScheduleWidget } from 'shared/api';
import { itIt } from 'shared/utils';

export const [takeScheduleWidgetTiny, resetScheduleWidgetTiny] = tinyMakerGenerator(
  0 as never as IScheduleWidget & { id: SchId },
  'w',
  'Мероприятие не найдено',
  async mkSimpleWhere => (await db.select().from(scheduleDB).where(mkSimpleWhere(scheduleDB)).limit(1)).at(0),
  itIt,
);
