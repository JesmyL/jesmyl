import { BackgroundConfigProps } from '#widgets/configurators/model';
import { FontWeightType } from '../../../../../04-widgets/configurators/FontWeight';
import { TextAlignConfigurator } from '../../../../../04-widgets/configurators/TextAlign';
import { ScreenTranslationPositionConfig, ScreenTranslationTextConfig } from './model';

export const defaultScreenTranslationPositionConfig: ScreenTranslationPositionConfig = {
  left: 5,
  top: 5,
  width: 90,
  height: 90,
};

export const defaultScreenTranslationTextConfig: ScreenTranslationTextConfig = {
  color: '#ffffff',
  fontWeight: FontWeightType.Bold,
  textAlign: TextAlignConfigurator.Center,
};

export const defaultScreenTranslationBackgroundConfig: BackgroundConfigProps = {
  background: '',
  backgroundColor: '#000000',
  isWithBackground: false,
};
