import { FontWeightType } from '#shared/ui/configurators/FontWeight';
import { BackgroundConfigProps } from '#shared/ui/configurators/model';
import { TextAlignConfigurator } from '#shared/ui/configurators/TextAlign/model';
import { CSSProperties } from 'react';
import { ScreenBroadcastPositionConfig, ScreenBroadcastTextConfig } from './model';

export const defaultScreenBroadcastPositionConfig: ScreenBroadcastPositionConfig = {
  left: 5,
  top: 5,
  width: 90,
  height: 90,
};

export const defaultScreenBroadcastTextConfig: ScreenBroadcastTextConfig = {
  color: '#ffffff',
  stroke: '#000000',
  fontWeight: FontWeightType.Bold,
  textAlign: TextAlignConfigurator.Center,
};

export const defaultScreenBroadcastBackgroundConfig: BackgroundConfigProps = {
  bg: '',
  bgColor: '#000000',
  withBg: false,
};

export const makeBroadcastTextStroke = (config: { stroke?: string | nil; strokeW?: number } | nil) =>
  ({
    WebkitTextStroke: config?.stroke ? `${config.stroke} ${config.strokeW || 0}em` : undefined,
  }) satisfies CSSProperties;
