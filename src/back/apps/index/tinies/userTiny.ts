import { backLocaleError } from 'back/locales/back';
import { userDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { tinyMakerGenerator } from 'back/drizzle/ex/tinyMaker';
import { UserId } from 'back/drizzle/schema/user';
import { jsonParseSecure } from 'back/json-secure';
import { UserInfoUnsecure } from 'shared/api';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';

export const [takeUserTiny, resetUserTiny] = tinyMakerGenerator(
  0 as never as UserInfoUnsecure & { m: number; id: UserId },
  'l',
  backLocaleError(BackLocaleKey.UserNotFound),
  async mkSimpleWhere => (await db.select().from(userDB).where(mkSimpleWhere(userDB)).limit(1)).at(0),
  it => ({ ...it, uauth: jsonParseSecure(it.auth) }),
);

export const takeAllUsersTiny = async () =>
  (await db.select().from(userDB)).map(it => ({ ...it, uauth: jsonParseSecure(it.auth) }));

export const takeUserLoginsByIds = async (ids: UserId[]) =>
  (await Promise.all(ids.map(id => takeUserTiny({ id }, false)))).filter(user => user != null).map(user => user.l);
