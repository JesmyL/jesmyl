import { remoteBroadcastSecretCodeLength, remoteBroadcastSecretCodeSearchParam } from 'shared/const/electron';

export const validateRemoteBroadcastSearch = (search: Record<string, unknown>) => {
  const fromList = search[remoteBroadcastSecretCodeSearchParam];

  return {
    ...(typeof fromList === 'string' && fromList.length > 0 && fromList.length <= remoteBroadcastSecretCodeLength
      ? { 'from-list': fromList }
      : {}),
  };
};
