import { cmIDB } from '#basis/lib/idb/cm';
import { BackgroundConfigProps } from '#entities/configurators/model';
import {
  defaultScreenTranslationBackgroundConfig,
  defaultScreenTranslationPositionConfig,
  defaultScreenTranslationTextConfig,
} from '../../../../../+complect/translations/complect/defaults';
import {
  useMakeScreenTranslationConfigsFillPack,
  useScreenTranslationCurrentConfigi,
} from '../../../../../+complect/translations/hooks/configs';
import { CmTranslationScreenConfig } from '../model';

export const defaultCmConfig: CmTranslationScreenConfig & BackgroundConfigProps = {
  ...defaultScreenTranslationPositionConfig,
  ...defaultScreenTranslationTextConfig,
  ...defaultScreenTranslationBackgroundConfig,
  isWithBackground: false,
};

export const useCmScreenTranslationConfigs = () =>
  useMakeScreenTranslationConfigsFillPack(cmIDB.useValue.translationScreenConfigs(), defaultCmConfig);

export const useCmScreenTranslationConfig = (configi: number | und): CmTranslationScreenConfig | und => {
  const configs = useCmScreenTranslationConfigs();
  return configi === undefined ? undefined : configs[configi];
};

export const useCmScreenTranslationCurrentConfig = (): CmTranslationScreenConfig | und =>
  useCmScreenTranslationConfigs()[useScreenTranslationCurrentConfigi()];
