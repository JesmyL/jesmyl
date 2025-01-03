import { ScreenTranslateConfigTypeFontWeight } from './FontWeight';
import {
  ScreenTranslationBackgroundConfigs,
  ScreenTranslationPositionConfig,
  ScreenTranslationTextConfig,
} from './model';
import { ScreenTranslateCurrentConfigTypeTextAlign } from './TextAlign';

export const defaultScreenTranslationPositionConfig: ScreenTranslationPositionConfig = {
  left: 5,
  top: 5,
  width: 90,
  height: 90,
};

export const defaultScreenTranslationTextConfig: ScreenTranslationTextConfig = {
  color: '#ffffff',
  fontWeight: ScreenTranslateConfigTypeFontWeight.Bold,
  textAlign: ScreenTranslateCurrentConfigTypeTextAlign.Center,
};

export const defaultScreenTranslationBackgroundConfig: ScreenTranslationBackgroundConfigs = {
  background: '',
  backgroundColor: '#000000',
  isWithBackground: false,
};
