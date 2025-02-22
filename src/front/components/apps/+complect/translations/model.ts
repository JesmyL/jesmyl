import { FontStyleType } from '#shared/ui/configurators/FontStyle';
import { FontWeightType } from '#shared/ui/configurators/FontWeight/ui';
import { BackgroundConfigProps } from '#shared/ui/configurators/model';

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
