import { FontStyleType } from '#shared/ui/configurators/FontStyle/model';
import { FontWeightType } from '#shared/ui/configurators/FontWeight';
import { BackgroundConfigProps } from '#shared/ui/configurators/model';
import { MyFileBoxId } from 'x/my-files';

export interface ScreenBroadcastConfig {
  title: string;
  proportion: number;
}

export type AlertLineConfig = BackgroundConfigProps & {
  id: number;
  title: string;
  text: string;
  top: number;
  speed: number;
  icon: KnownStameskaIconName;
  color: string;
  fontSize: number;
  fontFileId?: MyFileBoxId;
  fontStyle?: FontStyleType;
  fontWeight?: FontWeightType;
};
