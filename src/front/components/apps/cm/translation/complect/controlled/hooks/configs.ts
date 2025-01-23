import { cmIDB } from 'front/components/apps/cm/_db/cm-idb';
import {
  defaultScreenTranslationBackgroundConfig,
  defaultScreenTranslationPositionConfig,
  defaultScreenTranslationTextConfig,
} from '../../../../../+complect/translations/complect/defaults';
import { ScreenTranslationBackgroundConfigs } from '../../../../../+complect/translations/complect/model';
import {
  useMakeScreenTranslationConfigsFillPack,
  useScreenTranslationCurrentConfigi,
} from '../../../../../+complect/translations/hooks/configs';
import { CmTranslationScreenConfig } from '../model';

export const defaultCmConfig: CmTranslationScreenConfig & ScreenTranslationBackgroundConfigs = {
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
