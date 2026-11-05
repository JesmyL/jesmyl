import { backLocaleError } from 'back/locales/back';
import { userRoleDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { tinyMakerGenerator } from 'back/drizzle/ex/tinyMaker';
import { UserRoleId } from 'back/drizzle/schema/userRole';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { UserAccessRoleInfo } from 'shared/model/index/access-rights';
import { itIt } from 'shared/utils';

export const [takeUserRoleTiny, resetUserRoleTiny] = tinyMakerGenerator(
  0 as never as UserAccessRoleInfo & { id: UserRoleId },
  'n',
  backLocaleError(BackLocaleKey.RoleNotFound),
  async mkSimpleWhere => (await db.select().from(userRoleDB).where(mkSimpleWhere(userRoleDB)).limit(1)).at(0),
  itIt,
);
