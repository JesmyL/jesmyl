import { useAtomValue } from 'atomaric';
import { useCallback, useMemo } from 'react';
import { currentBroadcastConfigiAtom, useScreenBroadcastConfigsSet, useScreenBroadcastConfigsValue } from '../atoms';
import { defaultComplectConfig } from '../consts';
import { ScreenBroadcastConfig } from '../model';

export const useMakeScreenBroadcastConfigsFillPack = <Config>(configs: Config[], defaultConfig: Config) => {
  const coreConfigs = useScreenBroadcastConfigsValue();

  return useMemo(
    () => coreConfigs.map((_, configi) => configs[configi] ?? defaultConfig),
    [coreConfigs, configs, defaultConfig],
  );
};

export const useAddScreenBroadcastConfig = () => {
  const configs = useScreenBroadcastConfigsValue();
  const set = useScreenBroadcastConfigsSet();

  return useCallback(() => {
    set([...configs, { ...defaultComplectConfig, title: defaultComplectConfig.title + ' №' + (configs.length + 1) }]);

    return configs.length;
  }, [configs, set]);
};

export const useRemoveScreenBroadcastConfig = () => {
  const configs = useScreenBroadcastConfigsValue();
  const set = useScreenBroadcastConfigsSet();

  return useCallback((configi: number) => set(configs.toSpliced(configi, 1)), [configs, set]);
};

export const useGetScreenBroadcastConfig = () => {
  const configs = useScreenBroadcastConfigsValue();
  return useCallback((configi: number): ScreenBroadcastConfig | nil => configs[configi], [configs]);
};

export const useScreenBroadcastCurrentConfig = (): ScreenBroadcastConfig | und =>
  useScreenBroadcastConfigsValue()[useAtomValue(currentBroadcastConfigiAtom)];
