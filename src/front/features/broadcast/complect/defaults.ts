import { FontWeightType } from '#shared/ui/configurators/FontWeight';
import { BackgroundConfigProps } from '#shared/ui/configurators/model';
import { TextAlignConfigurator } from '#shared/ui/configurators/TextAlign/model';
import { ScreenBroadcastPositionConfig, ScreenBroadcastTextConfig } from './model';

export const defaultScreenBroadcastPositionConfig: ScreenBroadcastPositionConfig = {
  left: 5,
  top: 5,
  width: 90,
  height: 90,
};

export const defaultScreenBroadcastTextConfig: ScreenBroadcastTextConfig = {
  color: '#ffffff',
  fontWeight: FontWeightType.Bold,
  textAlign: TextAlignConfigurator.Center,
};

export const defaultScreenBroadcastBackgroundConfig: BackgroundConfigProps = {
  background: '',
  backgroundColor: '#000000',
  isWithBackground: false,
};
