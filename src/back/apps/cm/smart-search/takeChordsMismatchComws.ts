import { comDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { asc, eq } from 'drizzle-orm';
import { Bool } from 'shared/enums';
import { itIt } from 'shared/utils';

export const takeChordsMismatchComws = async () =>
  (
    await db
      .select({ w: comDB.w, c: comDB.c, o: comDB.o })
      .from(comDB)
      .where(eq(comDB.isRemoved, Bool.False))
      .orderBy(asc(comDB.w))
  )
    .filter(row =>
      row.o?.some(
        ord =>
          ord.c != null &&
          ord.p &&
          row.c[ord.c]
            ?.split('\n')
            .some(
              (line, linei, linea) =>
                line &&
                linei < linea.length - 1 &&
                line.trim().split(' ').filter(itIt).length !== ord.p![linei]?.length,
            ),
      ),
    )
    .map(row => row.w);
