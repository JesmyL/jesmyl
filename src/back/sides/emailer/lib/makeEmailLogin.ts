import { backLocaleError } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import md5 from 'md5';
import { LocalSokiAuth, SokiAuthLogin } from 'shared/api';
import { validEmailRegExp } from 'shared/const/index/regExp.validators';

export const makeAuthFromEmail = (email: string, auth: LocalSokiAuth | nil): LocalSokiAuth => {
  if (!email.match(validEmailRegExp)) throw backLocaleError(BackLocaleKey.EmailIncorrect);

  const newAuth = { ...auth, email };
  if ('iat' in newAuth) delete newAuth.iat;
  if ('exp' in newAuth) delete newAuth.exp;
  return newAuth;
};

export const makeLoginFromEmail = (email: string) => {
  if (!email.match(validEmailRegExp)) throw backLocaleError(BackLocaleKey.EmailIncorrect);
  return `@${md5(email.toLowerCase())}` as SokiAuthLogin;
};
