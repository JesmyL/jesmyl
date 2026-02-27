import { LocalSokiAuth, SokiAuthLogin } from 'shared/api';
import { validEmailRegExp } from 'shared/const/index/regExp.validators';
import { smylib } from 'shared/utils';

export const makeAuthFromEmail = (email: string, auth: LocalSokiAuth | nil): LocalSokiAuth => {
  if (!email.match(validEmailRegExp)) throw 'Incorrect E-mail';

  const newAuth = { ...auth, email };
  if ('iat' in newAuth) delete newAuth.iat;
  if ('exp' in newAuth) delete newAuth.exp;
  return newAuth;
};

export const makeLoginFromEmail = (email: string) => {
  if (!email.match(validEmailRegExp)) throw 'Incorrect E-mail';
  return `@${smylib.md5(email.toLowerCase())}` as SokiAuthLogin;
};
