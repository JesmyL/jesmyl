import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import {
  defaultScreenBroadcastBackgroundConfig,
  defaultScreenBroadcastPositionConfig,
  defaultScreenBroadcastTextConfig,
} from '#features/broadcast/complect/defaults';
import { useMakeScreenBroadcastConfigsFillPack } from '#features/broadcast/hooks/configs';
import { BackgroundConfigProps } from '#shared/ui/configurators/model';
import { cmIDB } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { CmBroadcastScreenConfig } from '../model/model';

export const cmBroadcastDefaultConfig: CmBroadcastScreenConfig & BackgroundConfigProps = {
  ...defaultScreenBroadcastPositionConfig,
  ...defaultScreenBroadcastTextConfig,
  ...defaultScreenBroadcastBackgroundConfig,
  isWithBackground: false,
};

export const useCmBroadcastScreenConfigs = () =>
  useMakeScreenBroadcastConfigsFillPack(cmIDB.useValue.broadcastScreenConfigs(), cmBroadcastDefaultConfig);

export const useCmBroadcastScreenConfig = (configi: number | und): CmBroadcastScreenConfig | und => {
  const configs = useCmBroadcastScreenConfigs();
  return configi === undefined ? undefined : configs[configi];
};

export const useCmBroadcastCurrentScreenConfig = (): CmBroadcastScreenConfig | und =>
  useCmBroadcastScreenConfigs()[useAtomValue(currentBroadcastConfigiAtom)];
