import { FontStyleType } from 'front/complect/configurators/FontStyle';
import { FontWeightType } from 'front/complect/configurators/FontWeight';
import { BackgroundConfigProps } from 'front/complect/configurators/model';

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
  icon: KnownIconNameForPack;
  color: string;
  fontSize: number;
  fontFamily?: string;
  fontStyle?: FontStyleType;
  fontWeight?: FontWeightType;
};
