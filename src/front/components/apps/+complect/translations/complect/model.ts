import { ScreenTranslateConfigTypeDisplay } from '../../../shared/ui/configurators/Display';
import { FontStyleType } from '../../../shared/ui/configurators/FontStyle';
import { FontWeightType } from '../../../shared/ui/configurators/FontWeight';
import { TextAlignConfigurator } from '../../../shared/ui/configurators/TextAlign';

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
