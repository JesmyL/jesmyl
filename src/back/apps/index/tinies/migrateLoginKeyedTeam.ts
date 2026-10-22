import { tglogger } from 'back/sides/telegram-bot/log/log-bot';
import { SokiAuthLogin, UserId } from 'shared/api';
import { objectKeys } from 'shared/utils/object.utils';
import { takeUserTiny } from './userTiny';

export const migrateLoginKeyedTeam = async <Member extends object>(
  team: PRecord<string, Member>,
  parseMember: (member: Member) => Member,
  scope: string,
): Promise<{ team: PRecord<UserId, Member>; isMigrated: boolean }> => {
  const keys = objectKeys(team);
  if (!keys.some(key => isNaN(+key))) return { team: team as PRecord<UserId, Member>, isMigrated: false };

  const actualTeam: PRecord<UserId, Member> = {};

  for (const key of keys) {
    const member = team[key];
    if (member == null) continue;

    const userId = isNaN(+key) ? (await takeUserTiny({ l: key as SokiAuthLogin }, false))?.id : (+key as UserId);

    if (userId == null) {
      tglogger.systemError(
        `Migration of ${scope} dropped member login="${key}": ${JSON.stringify(member)}`,
      );
      continue;
    }

    actualTeam[userId] = parseMember(member);
  }

  return { team: actualTeam, isMigrated: true };
};
