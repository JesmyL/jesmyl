import { useCallback } from 'react';
import {
  useCurrentTranslationConfigiValue,
  useScreenTranslationConfigsSet,
  useScreenTranslationConfigsValue,
} from '../atoms';
import { defaultComplectConfig } from '../consts';
import { ScreenTranslationConfig } from '../model';

export const useMakeScreenTranslationConfigsFillPack = <Config>(configs: Config[], defaultConfig: Config) => {
  return useScreenTranslationConfigsValue().map((_, configi) => configs[configi] ?? defaultConfig);
};

export const useAddScreenTranslationConfig = () => {
  const configs = useScreenTranslationConfigsValue();
  const set = useScreenTranslationConfigsSet();

  return useCallback(() => {
    set([...configs, { ...defaultComplectConfig, title: defaultComplectConfig.title + ' №' + (configs.length + 1) }]);

    return configs.length;
  }, [configs, set]);
};

export const useRemoveScreenTranslationConfig = () => {
  const configs = useScreenTranslationConfigsValue();
  const set = useScreenTranslationConfigsSet();

  return useCallback((configi: number) => set(configs.toSpliced(configi, 1)), [configs, set]);
};

export const useGetScreenTranslationConfig = () => {
  const configs = useScreenTranslationConfigsValue();
  return useCallback((configi: number): ScreenTranslationConfig | nil => configs[configi], [configs]);
};

export const useScreenTranslationCurrentConfigi: () => number = () => useCurrentTranslationConfigiValue();

export const useScreenTranslationCurrentConfig = (): ScreenTranslationConfig | und =>
  useScreenTranslationConfigsValue()[useScreenTranslationCurrentConfigi()];
