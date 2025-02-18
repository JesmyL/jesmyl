import { FontStyleType } from '#entities/configurators/FontStyle';
import { FontWeightType } from '#entities/configurators/FontWeight';
import { BackgroundConfigProps } from '#entities/configurators/model';

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
