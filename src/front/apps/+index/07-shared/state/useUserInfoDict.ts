import { useAtomValue } from 'atomaric';
import { useEffect, useMemo } from 'react';
import { UserId, UserInfoUnsecure, UserLogin } from 'shared/api';
import { objectValues } from 'shared/utils/object.utils';
import { indexTsjrpcClientMethods } from '../tsjrpc/tsjrpc.methods';
import { indexAppUserInfoDictAtom } from './atoms';

let userInfoDictRequest: Promise<unknown> | null = null;

const requestUserInfoDict = () =>
  (userInfoDictRequest ??= indexTsjrpcClientMethods.getUserInfoDict().then(dict => {
    indexAppUserInfoDictAtom.set(dict);
    return dict;
  }));

export const useUserInfoDict = () => {
  const dict = useAtomValue(indexAppUserInfoDictAtom);

  useEffect(() => {
    if (dict == null) void requestUserInfoDict().catch(() => {});
  }, [dict]);

  return useMemo(() => {
    const byId = new Map<UserId, UserInfoUnsecure>();
    const byLogin = new Map<UserLogin, UserInfoUnsecure>();

    objectValues(dict).forEach(userInfo => {
      if (userInfo == null) return;

      byId.set(userInfo.id, userInfo);
      byLogin.set(userInfo.l, userInfo);
    });

    return { byId, byLogin };
  }, [dict]);
};
