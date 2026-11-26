import { comDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { asc, eq } from 'drizzle-orm';
import { makeRegExp } from 'regexpert';
import { Bool } from 'shared/enums';
import { checkIsNumber } from 'shared/utils/checkIs';
import { objectKeys } from 'shared/utils/object.utils';

export const takeRepeatsMatchComws = async (param?: string) => {
  let reg: RegExp;

  try {
    reg = makeRegExp((param || '/~/i') as never);
  } catch (_error) {
    return [];
  }

  return (
    await db.select({ w: comDB.w, o: comDB.o }).from(comDB).where(eq(comDB.isRemoved, Bool.False)).orderBy(asc(comDB.w))
  )
    .filter(row =>
      row.o?.some(ord =>
        checkIsNumber(ord.r) ? `${ord.r}`.match(reg) : objectKeys(ord.r).some(key => `${key}`.match(reg)),
      ),
    )
    .map(row => row.w);
};
