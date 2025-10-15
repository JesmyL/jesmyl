import {
  defaultScreenTranslationBackgroundConfig,
  defaultScreenTranslationPositionConfig,
  defaultScreenTranslationTextConfig,
} from '#features/translations/complect/defaults';
import {
  useMakeScreenTranslationConfigsFillPack,
  useScreenTranslationCurrentConfigi,
} from '#features/translations/hooks/configs';
import { BackgroundConfigProps } from '#shared/ui/configurators/model';
import { cmIDB } from '$cm/shared/state';
import { CmTranslationScreenConfig } from '../model/model';

export const cmTranslationDefaultConfig: CmTranslationScreenConfig & BackgroundConfigProps = {
  ...defaultScreenTranslationPositionConfig,
  ...defaultScreenTranslationTextConfig,
  ...defaultScreenTranslationBackgroundConfig,
  isWithBackground: false,
};

export const useCmTranslationScreenConfigs = () =>
  useMakeScreenTranslationConfigsFillPack(cmIDB.useValue.translationScreenConfigs(), cmTranslationDefaultConfig);

export const useCmTranslationScreenConfig = (configi: number | und): CmTranslationScreenConfig | und => {
  const configs = useCmTranslationScreenConfigs();
  return configi === undefined ? undefined : configs[configi];
};

export const useCmTranslationCurrentScreenConfig = (): CmTranslationScreenConfig | und =>
  useCmTranslationScreenConfigs()[useScreenTranslationCurrentConfigi()];
