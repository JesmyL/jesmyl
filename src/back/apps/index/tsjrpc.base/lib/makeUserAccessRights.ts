import { SokiAuthLogin } from 'shared/api';
import { IndexAppUserAccessRightsWithoutInfo } from 'shared/model/index/access-rights';
import { accessRightTitlesFileStore, userAccessRightsAndRolesFileStore } from '../../file-stores';

export const makeUserAccessRights = (login: SokiAuthLogin | nil) => {
  const { rights, roles } = userAccessRightsAndRolesFileStore.getValue();
  if (login == null || rights[login] == null) return {};

  const userRights = rights[login];
  let userRightsResult: IndexAppUserAccessRightsWithoutInfo = {};

  if (userRights.info.role != null && roles[userRights.info.role]) {
    const titles = accessRightTitlesFileStore.getValue();

    if (userRights.info.role === 'TOP') {
      for (const scopeName in titles) {
        if (!(scopeName in titles)) continue;

        userRightsResult[scopeName as 'general'] = {};

        for (const ruleName in titles[scopeName as 'general']) {
          if (ruleName === 'info') continue;
          userRightsResult[scopeName as 'general']![ruleName as 'ALL'] = 15;
        }
      }
    }

    for (const scopeName in titles) {
      if (!(scopeName in titles) || userRights[scopeName as 'general'] == null || scopeName === 'general') continue;

      userRightsResult[scopeName as 'general'] = {
        ...userRightsResult[scopeName as 'general'],
        ...userRights[scopeName as 'general'],
      };

      delete userRightsResult[scopeName as 'general']?.info;
    }
  } else {
    const { info, ...rights } = userRights;
    userRightsResult = rights;
  }

  return userRightsResult;
};
