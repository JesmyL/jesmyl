import { comDB, ComId } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { tinyMakerGenerator } from 'back/drizzle/ex/tinyMaker';
import { and, eq, lt } from 'drizzle-orm';
import { IExportableCom } from 'shared/api';
import { Bool } from 'shared/enums';
import { takeCorrectComNumber } from 'shared/utils/cm/com/takeCorrectComNumber';

const selectDict = { n: comDB.n, al: comDB.al, w: comDB.w, id: comDB.id };

export const [takeComwTiny, resetComwTiny] = tinyMakerGenerator(
  0 as never as Pick<IExportableCom, keyof OmitOwn<typeof selectDict, 'id'>> & { i: number; id: ComId },
  'w',
  'Песня не найдена',
  async mkSimpleWhere => (await db.select(selectDict).from(comDB).where(mkSimpleWhere(comDB)).limit(1)).at(0),
  async (tiny, comw) => ({
    ...tiny,
    i: takeCorrectComNumber(await db.$count(comDB, and(eq(comDB.isRemoved, Bool.False), lt(comDB.w, comw)))),
  }),
  key => key in selectDict,
);
