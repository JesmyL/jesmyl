import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { useMakeScreenBroadcastConfigsFillPack } from '#features/broadcast/hooks/configs';
import { cmBroadcastDefaultConfig } from '$cm/shared/const/broadcast';
import { cmIDB } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { CmBroadcastScreenConfig } from 'shared/model/cm/broadcast';

export const useCmBroadcastScreenConfigs = () =>
  useMakeScreenBroadcastConfigsFillPack(cmIDB.useValue.broadcastScreenConfigs(), cmBroadcastDefaultConfig);

export const useCmBroadcastScreenConfig = (configi: number | und): CmBroadcastScreenConfig | und => {
  const configs = useCmBroadcastScreenConfigs();
  return configi === undefined ? undefined : configs[configi];
};

export const useCmBroadcastCurrentScreenConfig = (): CmBroadcastScreenConfig | und =>
  useCmBroadcastScreenConfigs()[useAtomValue(currentBroadcastConfigiAtom)];
