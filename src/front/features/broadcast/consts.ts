import { defaultScreenBroadcastBackgroundConfig } from './complect/defaults';
import { AlertLineConfig, ScreenBroadcastConfig } from './model';

export const defaultComplectConfig: ScreenBroadcastConfig = { title: 'Трансляция', proportion: 1 };

export const defaultAlertLineConfig: OmitOwn<AlertLineConfig, 'id'> = {
  title: 'Срочно!',
  icon: 'Alert01',
  fontSize: 30,
  top: 70,
  speed: 30,
  text: '',
  color: '#ec6969',
  ...defaultScreenBroadcastBackgroundConfig,
};
