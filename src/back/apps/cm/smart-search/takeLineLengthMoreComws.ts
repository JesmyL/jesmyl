import { constantsConfigFileStore } from 'back/apps/index/schedules/file-stores';
import { comDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { asc, eq } from 'drizzle-orm';
import { Bool } from 'shared/enums';
import { takeTextLineOverLengthIndex } from 'shared/utils/cm/com/takeTextLineOverLengthIndex';

export const takeLineLengthMoreComws = async (param?: string) => {
  const maxLength = +(param ?? '') || constantsConfigFileStore.getValue().maxAvailableComLineLength;

  return (
    await db.select({ w: comDB.w, t: comDB.t }).from(comDB).where(eq(comDB.isRemoved, Bool.False)).orderBy(asc(comDB.w))
  )
    .filter(row => row.t?.some(text => takeTextLineOverLengthIndex(text, maxLength).linei > -1))
    .map(row => row.w);
};
