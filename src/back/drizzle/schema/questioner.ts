import { bigint, bigserial, doublePrecision, index, jsonb, pgTable, text } from 'p/d';
import { SokiAuthLogin } from 'shared/api';
import {
  QuestionerBlankUser,
  QuestionerBlankWid,
  QuestionerTemplate,
  QuestionerTemplateId,
} from 'shared/model/q';
import { QuestionerUserAnswer } from 'shared/model/q/answer';

export const questionerBlankDB = pgTable(
  'questionerBlanks',
  {
    w: doublePrecision('w').$type<QuestionerBlankWid>().primaryKey(),

    m: bigint('m', { mode: 'number' }).notNull(),

    title: text('title').notNull(),
    dsc: text('dsc').notNull().default(''),

    anon: bigint('anon', { mode: 'number' }),

    tmp: jsonb('tmp').$type<PRecord<QuestionerTemplateId, QuestionerTemplate>>().notNull(),
    ord: jsonb('ord').$type<QuestionerTemplateId[]>().notNull(),
    team: jsonb('team').$type<PRecord<SokiAuthLogin, QuestionerBlankUser>>().notNull(),

    mod: bigint('mod', { mode: 'number' })
      .notNull()
      .$defaultFn(() => Date.now()),
  },
  table => [index('questionerBlanks_mod_idx').on(table.mod)],
);

export const questionerUserAnswerDB = pgTable(
  'questionerUserAnswers',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),

    blankw: doublePrecision('blankw')
      .$type<QuestionerBlankWid>()
      .notNull()
      .references(() => questionerBlankDB.w, { onDelete: 'cascade' }),

    fio: text('fio'),

    a: jsonb('a').$type<QuestionerUserAnswer['a']>().notNull(),

    mod: bigint('mod', { mode: 'number' })
      .notNull()
      .$defaultFn(() => Date.now()),
  },
  table => [index('questionerUserAnswers_blankw_idx').on(table.blankw)],
);
