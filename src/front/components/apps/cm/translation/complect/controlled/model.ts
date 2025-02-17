import { BackgroundConfigProps } from '#widgets/configurators/model';
import {
  ScreenTranslationPositionConfig,
  ScreenTranslationTextConfig,
} from '../../../../+complect/translations/complect/model';

export type CmTranslationTextScreenConfig = ScreenTranslationPositionConfig & ScreenTranslationTextConfig;

export interface CmTranslationScreenConfig extends CmTranslationTextScreenConfig, BackgroundConfigProps {
  subs?: Partial<Record<'next', CmTranslationTextScreenConfig>>;
  pushKind?: number;
}
