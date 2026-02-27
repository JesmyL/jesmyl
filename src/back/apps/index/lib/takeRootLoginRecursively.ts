import { indexUserLoginBindsFileStorage } from 'back/apps/index/file-stores';
import { SokiAuthLogin } from 'shared/api';
import { smylib } from 'shared/utils';

export const indexTakeRootLoginRecursively = (login: SokiAuthLogin) => {
  const binds = indexUserLoginBindsFileStorage.getValue();

  try {
    for (; binds[login] != null; ) {
      const authOrLogin = binds[login];

      if (authOrLogin == null) break;
      if (smylib.isStr(authOrLogin)) login = authOrLogin;
      else {
        if (!authOrLogin.login) break;
        login = authOrLogin.login;
      }
    }
  } catch (_e) {
    //
  }

  return login;
};
