import { BackgroundConfigProps } from '#shared/ui/configurators/model';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import {
  defaultScreenTranslationBackgroundConfig,
  defaultScreenTranslationPositionConfig,
  defaultScreenTranslationTextConfig,
} from 'front/components/apps/+complect/translations/complect/defaults';
import {
  useMakeScreenTranslationConfigsFillPack,
  useScreenTranslationCurrentConfigi,
} from 'front/components/apps/+complect/translations/hooks/configs';
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
