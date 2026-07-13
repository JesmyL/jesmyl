import { userRoleDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { eq } from 'drizzle-orm';
import { UserAccessRole, UserAccessRoleInfo } from 'shared/model/index/access-rights';
import { checkIsNotUndefined } from 'shared/utils/checkIs';

const tinyDict: PRecord<UserAccessRole, UserAccessRoleInfo | nil> = {};

export const resetUserRoleTiny = (role: UserAccessRole) => delete tinyDict[role];

export const takeUserRoleTiny = async (role: UserAccessRole) => {
  if (checkIsNotUndefined(tinyDict[role])) return tinyDict[role];

  const userRoleTiny = (await db.select().from(userRoleDB).where(eq(userRoleDB.n, role)).limit(1)).at(0);

  return (tinyDict[role] = userRoleTiny || null);
};
