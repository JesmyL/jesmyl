import { BackgroundConfigProps } from 'front/complect/configurators/model';
import { FontWeightType } from '../../../../../complect/configurators/FontWeight';
import { TextAlignConfigurator } from '../../../../../complect/configurators/TextAlign';
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
