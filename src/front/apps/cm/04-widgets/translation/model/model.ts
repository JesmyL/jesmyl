import { BackgroundConfigProps } from '#shared/ui/configurators/model';
import {
  ScreenTranslationPositionConfig,
  ScreenTranslationTextConfig,
} from 'front/components/apps/+complect/translations/complect/model';

export type CmTranslationTextScreenConfig = ScreenTranslationPositionConfig & ScreenTranslationTextConfig;

export interface CmTranslationScreenConfig extends CmTranslationTextScreenConfig, BackgroundConfigProps {
  subs?: Partial<Record<'next', CmTranslationTextScreenConfig>>;
  pushKind?: number;
}
