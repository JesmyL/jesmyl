import { UserAuth } from 'shared/api';
import * as rolesFromFile from '../../../back/apps/index/+case/userRoles.json';
import * as rightTitlesFromFile from '../../../back/apps/index/rightTitles.json';

export type IndexAppAccessRightTitles = typeof rightTitlesFromFile;
export type UserAccessRole = keyof typeof rolesFromFile;

export type IndexAccessScopeRulesWithInfo<Info> = { info: Info } & IndexAccessScopeRules;

export type IndexAccessScopeRules = Partial<{
  [Scope in keyof IndexAppAccessRightTitles]: Partial<{
    [Rule in keyof IndexAppAccessRightTitles[Scope]]: number;
  }>;
}>;

export type AccessRightsOwnerInfo<Role extends string> = UserAuth & {
  role?: Role;
};

export type UserAccessRoleStoraged = PRecord<UserAccessRole, { r?: UserAccessRoleInfo['r'] }>;

export type UserAccessRoleInfo = NullifyOptionals<{
  m: number;
  n: UserAccessRole;
  r?: IndexAccessScopeRules;
}>;

rolesFromFile satisfies UserAccessRoleStoraged;
