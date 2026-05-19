import { BackgroundConfigProps } from '#shared/ui/configurators/model';
import { ScreenBroadcastTextConfig } from './complect/model';

export interface ScreenBroadcastConfig {
  title: string;
  proportion: number;
}

export type AlertLineConfig = BackgroundConfigProps &
  Partial<ScreenBroadcastTextConfig> & {
    id: number;
    title: string;
    text: string;
    top: number;
    speed: number;
    color: string;
    icon: KnownStameskaIconName;
    fontSize: number;
  };
