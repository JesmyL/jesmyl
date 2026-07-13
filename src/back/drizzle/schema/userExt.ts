import { bigint, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { MigratableComToolName, SokiAppName } from 'shared/api';
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

  cmFavComTools: text('cmFavComTools')
    .array()
    .$type<MigratableComToolName[]>()
    .notNull()
    .$defaultFn(() => []),
});
