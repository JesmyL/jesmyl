import { comsDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { and, eq, lt } from 'drizzle-orm';
import { CmComWid, IExportableCom } from 'shared/api';
import { Bool } from 'shared/enums';
import { checkIsNotUndefined } from 'shared/utils/checkIs';

const tinyDict: PRecord<CmComWid, Tiny | null> = {};
const selectDict = { n: comsDB.n, al: comsDB.al, w: comsDB.w };

type Tiny = Pick<IExportableCom, keyof typeof selectDict> & { i: number };

export const resetComwTiny = async (changedKey: keyof typeof selectDict, comw: RKey<CmComWid>) => {
  if (changedKey in selectDict) delete tinyDict[comw];
};

export const takeComwTiny = async (comw: RKey<CmComWid>) => {
  if (checkIsNotUndefined(tinyDict[comw])) return tinyDict[comw];

  const comTiny = (await db.select(selectDict).from(comsDB).where(eq(comsDB.w, +comw))).at(0);

  return (tinyDict[comw] = comTiny
    ? {
        ...comTiny,
        i: await db.$count(comsDB, and(eq(comsDB.isRemoved, Bool.False), lt(comsDB.w, +comw))),
      }
    : null);
};
