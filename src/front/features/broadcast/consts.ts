import { defaultScreenTranslationBackgroundConfig } from './complect/defaults';
import { AlertLineConfig, ScreenTranslationConfig } from './model';

export const defaultComplectConfig: ScreenTranslationConfig = { title: 'Трансляция', proportion: 1 };

export const defaultAlertLineConfig: OmitOwn<AlertLineConfig, 'id'> = {
  title: 'Срочно!',
  icon: 'Alert01',
  fontSize: 30,
  top: 70,
  speed: 30,
  text: '',
  color: '#ec6969',
  ...defaultScreenTranslationBackgroundConfig,
};
