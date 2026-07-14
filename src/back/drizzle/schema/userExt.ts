/* eslint-disable @typescript-eslint/no-explicit-any */
import { eq } from 'drizzle-orm';
import { bigint, integer, PgSelectBase, pgTable, SelectedFields, text } from 'drizzle-orm/pg-core';
import { MigratableComToolName, SokiAppName } from 'shared/api';
import { db } from '../drizzle.db';
import { emptyTextArraySQL } from './lib/const';
import { userDB } from './user';

const typeExample = (name: string) => bigint(name, { mode: 'number' }).notNull().default(0);

const modColumn = <Name extends `${SokiAppName}${Uppercase<string>}${string}Mod`>(name: Name) =>
  ({ [name]: typeExample(name) }) as Record<Name, ReturnType<typeof typeExample>>;

export const userExtDB = pgTable('userExt', {
  userId: integer('userId')
    .unique()
    .notNull()
    .references(() => userDB.id, { onDelete: 'cascade' }),

  ...modColumn('cmFavComMod'),
  ...modColumn('cmFavComToolsMod'),

  cmFavComTools: text('cmFavComTools').array().$type<MigratableComToolName[]>().notNull().default(emptyTextArraySQL),

  cmCommAlts: text('cmCommAlts').array().notNull().default(emptyTextArraySQL),
});

export const selectUserExt = <const Sel extends SelectedFields, Ret extends PgSelectBase<any, Sel, 'multiple', any>>(
  sel: Sel,
) => db.select(sel).from(userExtDB).leftJoin(userDB, eq(userExtDB.userId, userDB.id)) as unknown as Ret;
