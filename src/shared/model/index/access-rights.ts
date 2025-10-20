import { SokiAuthLogin } from 'shared/api';
import * as rightsFromFile from '../../../back/apps/index/+case/rights.json';
import * as rightTitlesFromFile from '../../../back/apps/index/rightTitles.json';

export type IndexAppAccessRightTitles = typeof rightTitlesFromFile;
export type UserAccessRole = keyof typeof rightsFromFile.roles;

type UserAccessRights<LoginKey extends string, Role extends string> = {
  roles: RPRecord<'TOP', UserAccessRole, IndexAccessScopeRules<{ m: number }>>;
  rights: Partial<Record<LoginKey, IndexAccessScopeRules<AccessRightsOwnerInfo<Role>>>>;
};

export type IndexAccessScopeRules<Info> = { info: Info } & Partial<{
  [Scope in keyof IndexAppAccessRightTitles]: Partial<{
    [Rule in keyof IndexAppAccessRightTitles[Scope]]: number;
  }>;
}>;

export type AccessRightsOwnerInfo<Role extends string> = {
  fio: string;
  m: number;
  role?: Role;
};

export type IndexAppUserAccessRights = UserAccessRights<SokiAuthLogin, UserAccessRole>['rights'];
export type IndexAppUserAccessRightsAndRoles = UserAccessRights<SokiAuthLogin, UserAccessRole>;
export type IndexAppUserAccessRightsWithoutInfo = Partial<UserAccessRights<string, string>['rights'][string]>;

rightsFromFile satisfies UserAccessRights<string, string>;
