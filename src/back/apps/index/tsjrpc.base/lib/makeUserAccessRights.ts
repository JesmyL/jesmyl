import { SokiAuthLogin } from 'shared/api';
import { IndexAccessScopeRules } from 'shared/model/index/access-rights';
import { accessRightTitlesFileStore } from '../../file-stores';
import { takeUserRoleTiny } from '../../tinies/userRoleTiny';
import { takeUserTiny } from '../../tinies/userTiny';

export const makeUserAccessRights = async (login: SokiAuthLogin | nil) => {
  if (!login) return {};

  const { rights: userRights, r: userRole } = (await takeUserTiny({ l: login }, false)) ?? {};

  if (!userRights) return {};

  let userRightsResult: IndexAccessScopeRules = {};

  if (userRole) {
    const titles = accessRightTitlesFileStore.getValue();

    if (userRole === 'TOP') {
      for (const scopeName in titles) {
        if (!(scopeName in titles)) continue;

        userRightsResult[scopeName as 'general'] = {};

        for (const ruleName in titles[scopeName as 'general']) {
          if (ruleName !== 'info') userRightsResult[scopeName as 'general']![ruleName as 'ALL'] = 15;
        }
      }
    } else {
      const { r: roleRules } = (await takeUserRoleTiny({ n: userRole })) ?? {};

      if (roleRules) {
        for (const scopeName in roleRules) {
          if (!(scopeName in roleRules)) continue;

          const rules = roleRules[scopeName as 'general'] ?? {};
          userRightsResult[scopeName as 'general'] = rules;
        }
      }
    }

    for (const scopeName in titles) {
      if (!(scopeName in titles) || userRights[scopeName as 'general'] == null || scopeName === 'general') continue;

      userRightsResult[scopeName as 'general'] = {
        ...userRightsResult[scopeName as 'general'],
        ...userRights[scopeName as 'general'],
      };
    }
  } else {
    userRightsResult = userRights;
  }

  return userRightsResult;
};
