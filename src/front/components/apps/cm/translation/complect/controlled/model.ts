import {
  ScreenTranslationPositionConfig,
  ScreenTranslationTextConfig,
} from '#features/translations/model/Position.model';
import { BackgroundConfigProps } from '#shared/ui/configurators/model';

export type CmTranslationTextScreenConfig = ScreenTranslationPositionConfig & ScreenTranslationTextConfig;

export interface CmTranslationScreenConfig extends CmTranslationTextScreenConfig, BackgroundConfigProps {
  subs?: Partial<Record<'next', CmTranslationTextScreenConfig>>;
  pushKind?: number;
}
