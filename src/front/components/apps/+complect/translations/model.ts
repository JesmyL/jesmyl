import { FontStyleType } from '#widgets/configurators/FontStyle';
import { FontWeightType } from '#widgets/configurators/FontWeight';
import { BackgroundConfigProps } from '#widgets/configurators/model';

export interface ScreenTranslationConfig {
  title: string;
  proportion: number;
}

export type AlertLineConfig = BackgroundConfigProps & {
  id: number;
  title: string;
  text: string;
  top: number;
  speed: number;
  icon: TheIconKnownName;
  color: string;
  fontSize: number;
  fontFamily?: string;
  fontStyle?: FontStyleType;
  fontWeight?: FontWeightType;
};
