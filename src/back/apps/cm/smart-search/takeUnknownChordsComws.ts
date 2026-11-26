import { chordPackFileStore } from 'back/apps/cm/file-stores';
import { comDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { asc, eq } from 'drizzle-orm';
import { makeRegExp } from 'regexpert';
import { CmCom } from 'shared/const/cm/Com';
import { Bool } from 'shared/enums';
import { itIt } from 'shared/utils';
import { objectKeys } from 'shared/utils/object.utils';

export const takeUnknownChordsComws = async () => {
  const knownChords = new Set(objectKeys(chordPackFileStore.getValue()));

  return (await db.select().from(comDB).where(eq(comDB.isRemoved, Bool.False)).orderBy(asc(comDB.w)))
    .filter(comRow => {
      try {
        const com = new CmCom(comRow, null, null, Bool.False);
        const difference = new Set(
          com
            .transposedBlocks()
            ?.map(block => block.split(makeRegExp('/[\\s.-]+/')))
            .flat()
            .filter(itIt),
        ).difference(knownChords);

        return difference.size > 0;
      } catch (_error) {
        return false;
      }
    })
    .map(row => row.w);
};
