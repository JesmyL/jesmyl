import { userDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { jsonParseSecure } from 'back/json-secure';
import { eq } from 'drizzle-orm';
import { UserInfoUnsecure, UserLogin } from 'shared/api';
import { checkIsNotUndefined } from 'shared/utils/checkIs';

const tinyDict: PRecord<UserLogin, (UserInfoUnsecure & { m: number; id: number }) | nil> = {};

export const resetUserTiny = async (login: UserLogin) => delete tinyDict[login];

export const takeUserTiny = async (login: UserLogin) => {
  if (checkIsNotUndefined(tinyDict[login])) return tinyDict[login] ?? undefined;

  const userTiny = (await db.select().from(userDB).where(eq(userDB.l, login)).limit(1)).at(0);

  return (tinyDict[login] = userTiny ? { ...userTiny, uauth: jsonParseSecure(userTiny.auth) } : undefined);
};
