import { ScreenTranslateConfigTypeDisplay } from '#shared/ui/configurators/Display';
import { FontStyleType } from '#shared/ui/configurators/FontStyle/model';
import { FontWeightType } from '#shared/ui/configurators/FontWeight';
import { TextAlignConfigurator } from '#shared/ui/configurators/TextAlign/model';
import { TextCase } from 'shared/model/common/sortDirection';
import { MyFileBoxId } from 'x/my-files';

export interface ScreenBroadcastSimpleTextConfig {
  color: string;
  stroke?: string;
  strokeW?: number;
  display?: ScreenTranslateConfigTypeDisplay;
  opacity?: number;
  fontStyle?: FontStyleType;
  case?: TextCase;
}

export interface ScreenBroadcastTextConfig extends ScreenBroadcastSimpleTextConfig {
  fontFileId?: MyFileBoxId;
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

export const enum BroadcastResizeBorderPositions {
  Top,
  Right,
  Bottom,
  Left,
}
