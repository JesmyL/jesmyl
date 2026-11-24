import {
  remoteBroadcastAskNameSearchParam,
  remoteBroadcastSecretCodeLength,
  remoteBroadcastSecretCodeSearchParam,
  remoteBroadcastUserIdentityFieldMaxLength,
  remoteBroadcastUserNameSearchParam,
} from 'shared/const/electron';

export const validateRemoteBroadcastSearch = (search: Record<string, unknown>) => {
  const fromList = search[remoteBroadcastSecretCodeSearchParam];
  const fio = search[remoteBroadcastUserNameSearchParam];
  const userName = typeof fio === 'string' ? fio.trim() : '';

  return {
    ...(typeof fromList === 'string' && fromList.length > 0 && fromList.length <= remoteBroadcastSecretCodeLength
      ? { [remoteBroadcastSecretCodeSearchParam]: fromList }
      : {}),
    ...(userName.length > 0 && userName.length <= remoteBroadcastUserIdentityFieldMaxLength
      ? { [remoteBroadcastUserNameSearchParam]: userName }
      : {}),
    ...(search[remoteBroadcastAskNameSearchParam] === '1' ? { [remoteBroadcastAskNameSearchParam]: '1' } : {}),
  };
};
