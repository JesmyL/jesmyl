import { ScreenTranslateConfigTypeDisplay } from '../../../../../04-widgets/configurators/Display';
import { FontStyleType } from '../../../../../04-widgets/configurators/FontStyle';
import { FontWeightType } from '../../../../../04-widgets/configurators/FontWeight';
import { TextAlignConfigurator } from '../../../../../04-widgets/configurators/TextAlign';

// export type ScreenTranslationPartialConfigProps<Config> = {
//   config: Config;
//   updateConfig: (config: Partial<Config>) => void;
//   title?: string;
// };

export interface ScreenTranslationSimpleTextConfig {
  color: string;
  display?: ScreenTranslateConfigTypeDisplay;
  opacity?: number;
  fontStyle?: FontStyleType;
}

export interface ScreenTranslationTextConfig extends ScreenTranslationSimpleTextConfig {
  fontFamily?: string;
  fontWeight: FontWeightType;
  textAlign: TextAlignConfigurator;
}

export interface ScreenTranslationPositionConfig {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface FixedResizerLines {
  type: 'vert' | 'horz';
  value: number;
}
