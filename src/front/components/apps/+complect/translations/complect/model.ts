import { ScreenTranslateConfigTypeDisplay } from '../../../../../06-entities/configurators/Display';
import { FontStyleType } from '../../../../../06-entities/configurators/FontStyle';
import { FontWeightType } from '../../../../../06-entities/configurators/FontWeight';
import { TextAlignConfigurator } from '../../../../../06-entities/configurators/TextAlign';

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
