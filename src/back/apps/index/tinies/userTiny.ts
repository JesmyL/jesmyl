import { userDB, UserId } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { tinyMakerGenerator } from 'back/drizzle/ex/tinyMaker';
import { jsonParseSecure } from 'back/json-secure';
import { UserInfoUnsecure } from 'shared/api';

export const [takeUserTiny, resetUserTiny] = tinyMakerGenerator(
  0 as never as UserInfoUnsecure & { m: number; id: UserId },
  'l',
  'Пользователь не найден',
  async mkSimpleWhere => (await db.select().from(userDB).where(mkSimpleWhere(userDB)).limit(1)).at(0),
  it => ({ ...it, uauth: jsonParseSecure(it.auth) }),
);
