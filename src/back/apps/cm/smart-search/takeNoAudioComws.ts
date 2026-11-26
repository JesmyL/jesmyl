import { comDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { asc, eq } from 'drizzle-orm';
import { Bool } from 'shared/enums';

export const takeNoAudioComws = async () =>
  (
    await db
      .select({ w: comDB.w, al: comDB.al })
      .from(comDB)
      .where(eq(comDB.isRemoved, Bool.False))
      .orderBy(asc(comDB.w))
  )
    .filter(row => !row.al?.length)
    .map(row => row.w);
