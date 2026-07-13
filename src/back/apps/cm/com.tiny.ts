import { comDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { and, eq, lt } from 'drizzle-orm';
import { CmComWid, IExportableCom } from 'shared/api';
import { Bool } from 'shared/enums';
import { checkIsNotUndefined } from 'shared/utils/checkIs';
import { takeCorrectComNumber } from 'shared/utils/cm/com/takeCorrectComNumber';

const tinyDict: PRecord<CmComWid, Tiny | null> = {};
const selectDict = { n: comDB.n, al: comDB.al, w: comDB.w, id: comDB.id };

type Tiny = Pick<IExportableCom, keyof OmitOwn<typeof selectDict, 'id'>> & { i: number; id: number };

export const resetComwTiny = async (changedKey: keyof typeof selectDict, comw: RKey<CmComWid>) => {
  if (changedKey in selectDict) delete tinyDict[comw];
};

export const takeComwTiny = async (comw: RKey<CmComWid>) => {
  if (checkIsNotUndefined(tinyDict[comw])) return tinyDict[comw];

  const comTiny = (await db.select(selectDict).from(comDB).where(eq(comDB.w, +comw))).at(0);

  return (tinyDict[comw] = comTiny
    ? {
        ...comTiny,
        i: takeCorrectComNumber(await db.$count(comDB, and(eq(comDB.isRemoved, Bool.False), lt(comDB.w, +comw)))),
      }
    : null);
};
