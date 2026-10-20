import { translateBase } from '#basis/locale';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { defaultScreenBroadcastBackgroundConfig } from './complect/defaults';
import { AlertLineConfig, ScreenBroadcastConfig } from './model';

export const defaultComplectConfig: ScreenBroadcastConfig = {
  get title() {
    return translateBase(BaseLocaleKey.Broadcast);
  },
  proportion: 1,
};

export const defaultAlertLineConfig: OmitOwn<AlertLineConfig, 'id'> = {
  get title() {
    return translateBase(BaseLocaleKey.Urgent);
  },
  icon: 'Alert01',
  fontSize: 30,
  top: 70,
  speed: 30,
  text: '',
  color: '#ec6969',
  ...defaultScreenBroadcastBackgroundConfig,
};
