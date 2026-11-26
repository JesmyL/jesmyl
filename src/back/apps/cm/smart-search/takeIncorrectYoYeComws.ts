import { eePackFileStore } from 'back/apps/cm/file-stores';
import { comDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { asc, eq } from 'drizzle-orm';
import { Bool } from 'shared/enums';
import { slavicLowerLettersStr } from 'shared/utils/cm/com/const';
import { lazyInit } from 'shared/utils/lazyInit';
import { forEachObjectEntries } from 'shared/utils/object.utils';

const incorrectYoYeRegLazy = lazyInit(() => {
  const words: string[] = [];

  forEachObjectEntries(eePackFileStore.getValue(), (word, code) => {
    if (code === 2 || (Array.isArray(code) && code.includes(2))) words.push(word);
  });

  const notRuLetter = `([^${slavicLowerLettersStr}])`;
  return new RegExp(notRuLetter + '(' + words.join('|') + ')' + notRuLetter, 'i');
});

export const takeIncorrectYoYeComws = async () => {
  const reg = incorrectYoYeRegLazy();
  const rows = await db
    .select({ w: comDB.w, n: comDB.n, t: comDB.t })
    .from(comDB)
    .where(eq(comDB.isRemoved, Bool.False))
    .orderBy(asc(comDB.w));

  return rows.filter(row => row.t != null && reg.exec(' ' + row.n + '\n' + row.t.join('\n') + ' ')).map(row => row.w);
};
