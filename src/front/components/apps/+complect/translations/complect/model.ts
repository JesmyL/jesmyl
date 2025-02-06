import { ScreenTranslateConfigTypeDisplay } from '../../../../../complect/configurators/Display';
import { FontStyleType } from '../../../../../complect/configurators/FontStyle';
import { FontWeightType } from '../../../../../complect/configurators/FontWeight';
import { TextAlignConfigurator } from '../../../../../complect/configurators/TextAlign';

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
