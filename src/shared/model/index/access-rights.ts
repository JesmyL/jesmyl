import { SokiAuthLogin } from 'shared/api';
import { accessRightsCRUDOperations } from 'shared/utils/index/utils';
import * as rightsFromFile from '../../../back/apps/index/+case/rights.json';
import * as rightTitlesFromFile from '../../../back/apps/index/rightTitles.json';

export type IndexAppAccessRightTitles = typeof rightTitlesFromFile;
type UserAccessRights<LoginKey extends string> = Partial<
  Record<
    LoginKey,
    Partial<{
      [Scope in keyof IndexAppAccessRightTitles]: Partial<{ [Rule in keyof IndexAppAccessRightTitles[Scope]]: number }>;
    }> & { info: AccessRightsOwnerInfo }
  >
>;

export type AccessRightsOwnerInfo = {
  fio: string;
  isRequest?: true;
  m: number;
};
export type IndexAppUserAccessRights = UserAccessRights<SokiAuthLogin>;
export type IndexAppUserAccessRightsWithoutInfo = Partial<UserAccessRights<string>[string]>;

export type UpdateUserAccessRight = <
  Scope extends keyof IndexAppAccessRightTitles,
  Rule extends keyof IndexAppAccessRightTitles[Scope],
>(args: {
  login: SokiAuthLogin;
  scope: Scope;
  rule: Rule;
  operation: (typeof accessRightsCRUDOperations)[number];
  value: boolean;
}) => IndexAppUserAccessRights | null;

const _asd: UserAccessRights<string> = rightsFromFile;
