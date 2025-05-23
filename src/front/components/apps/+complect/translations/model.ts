import { FontStyleType } from '#shared/ui/configurators/FontStyle/model';
import { FontWeightType } from '#shared/ui/configurators/FontWeight';
import { BackgroundConfigProps } from '#shared/ui/configurators/model';
import { StameskaIconName } from 'stameska-icon';

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
  icon: StameskaIconName;
  color: string;
  fontSize: number;
  fontFamily?: string;
  fontStyle?: FontStyleType;
  fontWeight?: FontWeightType;
};
