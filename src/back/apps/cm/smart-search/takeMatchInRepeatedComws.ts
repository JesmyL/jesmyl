import { comDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { asc, eq } from 'drizzle-orm';
import { makeRegExp } from 'regexpert';
import { CmComTextSquareBracketsMode } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { Bool } from 'shared/enums';

export const takeMatchInRepeatedComws = async (param?: string) => {
  let reg: RegExp;

  try {
    reg = makeRegExp((param || '/\\/\\//i') as never);
  } catch (_error) {
    return [];
  }

  return (await db.select().from(comDB).where(eq(comDB.isRemoved, Bool.False)).orderBy(asc(comDB.w)))
    .filter(comRow => {
      try {
        const ords = new CmCom(comRow, null, null, Bool.False).setOrders() ?? [];
        return ords.some(ord => ord.repeatedText(CmComTextSquareBracketsMode.AsIs).match(reg));
      } catch (_error) {
        return false;
      }
    })
    .map(row => row.w);
};
