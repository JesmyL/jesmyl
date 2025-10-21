import { ScreenTranslateConfigTypeDisplay } from '#shared/ui/configurators/Display';
import { FontStyleType } from '#shared/ui/configurators/FontStyle/model';
import { FontWeightType } from '#shared/ui/configurators/FontWeight';
import { TextAlignConfigurator } from '#shared/ui/configurators/TextAlign/model';

export interface ScreenBroadcastSimpleTextConfig {
  color: string;
  display?: ScreenTranslateConfigTypeDisplay;
  opacity?: number;
  fontStyle?: FontStyleType;
}

export interface ScreenBroadcastTextConfig extends ScreenBroadcastSimpleTextConfig {
  fontFamily?: string;
  fontWeight: FontWeightType;
  textAlign: TextAlignConfigurator;
}

export interface ScreenBroadcastPositionConfig {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface FixedResizerLines {
  type: 'vert' | 'horz';
  value: number;
}
