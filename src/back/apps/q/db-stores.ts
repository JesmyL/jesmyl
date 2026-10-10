import { db, dbUpdate } from 'back/drizzle/drizzle.db';
import { questionerBlankDB, questionerUserAnswerDB } from 'back/drizzle/schema/questioner';
import { eq, gt } from 'drizzle-orm';
import { QuestionerBlank, QuestionerBlankWid, QuestionerType, QuestionerVariatedType } from 'shared/model/q';
import { QuestionerUserAnswer, QuestionerUserAnswerValueBox } from 'shared/model/q/answer';
import { forEachObjectEntries, objectLength } from 'shared/utils/object.utils';
import { escapeHtmlLazy } from 'shared/utils/string.utils';

export const mapBlankRow = (row: typeof questionerBlankDB.$inferSelect): QuestionerBlank => ({
  w: row.w,
  m: row.m,
  title: row.title,
  dsc: row.dsc,
  anon: row.anon ? 1 : undefined,
  tmp: row.tmp,
  ord: row.ord,
  team: row.team,
});

const getBlank = async (w: QuestionerBlankWid): Promise<QuestionerBlank | null> => {
  const rows = await db.select().from(questionerBlankDB).where(eq(questionerBlankDB.w, w)).limit(1);

  return rows[0] ? mapBlankRow(rows[0]) : null;
};

const createBlank = async (makeItem: () => QuestionerBlank): Promise<{ item: QuestionerBlank }> => {
  const item = makeItem();

  await db.insert(questionerBlankDB).values({
    w: item.w,
    m: item.m,
    title: item.title,
    dsc: item.dsc,
    anon: item.anon ?? null,
    tmp: item.tmp,
    ord: item.ord,
    team: item.team,
  });

  return { item };
};

const saveBlank = async (w: QuestionerBlankWid, blank: QuestionerBlank): Promise<number | null> => {
  const mod = Date.now();

  const rows = await dbUpdate(
    questionerBlankDB,
    {
      m: blank.m,
      title: blank.title,
      dsc: blank.dsc,
      anon: blank.anon ?? null,
      tmp: blank.tmp,
      ord: blank.ord,
      team: blank.team,
      mod,
    },
    eq(questionerBlankDB.w, w),
  ).returning({ mod: questionerBlankDB.mod });

  return rows[0]?.mod ?? null;
};

const getFreshBlanks = async (
  lastModfiedAt: number,
  filter: (blank: QuestionerBlank) => boolean,
): Promise<{ items: QuestionerBlank[]; maxMod: number }> => {
  const rows = await db.select().from(questionerBlankDB).where(gt(questionerBlankDB.mod, lastModfiedAt));

  const items: QuestionerBlank[] = [];
  let maxMod = lastModfiedAt;

  for (const row of rows) {
    const item = mapBlankRow(row);

    if (!filter(item)) continue;
    if (row.mod > maxMod) maxMod = row.mod;

    items.push(item);
  }

  return { items, maxMod };
};

export const questionerBlanksStore = {
  getItem: getBlank,
  createItem: createBlank,
  saveItem: saveBlank,
  getFreshItems: getFreshBlanks,
};

const getAnswers = async (blankw: QuestionerBlankWid): Promise<QuestionerUserAnswer[]> => {
  const rows = await db
    .select()
    .from(questionerUserAnswerDB)
    .where(eq(questionerUserAnswerDB.blankw, blankw))
    .orderBy(questionerUserAnswerDB.id);

  return rows.map(row => ({ fio: row.fio ?? undefined, a: row.a }));
};

const pushAnswer = async (blankw: QuestionerBlankWid, answer: QuestionerUserAnswer): Promise<string> => {
  const blank = await getBlank(blankw);
  if (blank == null) throw `Blank ${blankw} not found`;

  forEachObjectEntries(answer.a, (templateId, answerValue) => {
    if (answerValue == null) return;
    if (answerValue.v == null) {
      delete answer.a[templateId];
      return;
    }

    const template = blank.tmp[templateId];
    if (template == null) return;

    if (template.type === QuestionerType.Check || template.type === QuestionerType.Radio) {
      const userAnswer = answerValue as QuestionerUserAnswerValueBox[QuestionerVariatedType];
      userAnswer.len = objectLength(template.variants);
    }
  });

  await db.insert(questionerUserAnswerDB).values({
    blankw,
    fio: answer.fio ?? null,
    a: answer.a,
  });

  const fio = answer.fio ? `"${escapeHtmlLazy()(answer.fio)}"` : 'Анонимного пользователя';

  return `Получен ответ на опрос ${escapeHtmlLazy()(blank.title)} от ${fio}\n\n<blockquote expandable>${escapeHtmlLazy()(JSON.stringify(answer, null, 1))}</blockquote>`;
};

export const questionerUserAnswersStore = {
  getAnswers,
  pushAnswer,
};
