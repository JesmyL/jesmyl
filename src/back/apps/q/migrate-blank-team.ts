import { migrateLoginKeyedTeam } from 'back/apps/index/tinies/migrateLoginKeyedTeam';
import { QuestionerBlank, QuestionerBlankUser } from 'shared/model/q';

type LegacyQuestionerBlankUser = QuestionerBlankUser & { fio?: string };

export const migrateBlankTeam = async (blank: QuestionerBlank) => {
  const { team, isMigrated } = await migrateLoginKeyedTeam(
    blank.team as never as PRecord<string, LegacyQuestionerBlankUser>,
    ({ r }) => ({ r }),
    `blank ${blank.w} "${blank.title}"`,
  );
  if (!isMigrated) return false;

  blank.team = team;

  return true;
};
