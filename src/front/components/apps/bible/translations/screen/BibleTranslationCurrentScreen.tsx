import { useIsScreenTranslationTextVisible } from 'front/components/apps/+complect/translations/atoms';
import {
  useScreenTranslationCurrentConfig,
  useScreenTranslationCurrentConfigi,
} from 'front/components/apps/+complect/translations/hooks/configs';
import { TranslationScreenProps } from 'front/components/apps/+complect/translations/Translations.model';
import { useBibleScreenTranslationConfig } from '../hooks/configs';
import { BibleTranslationScreen } from './BibleTranslationScreen';

export function BibleTranslationCurrentScreen(props: TranslationScreenProps) {
  const currentConfigi = useScreenTranslationCurrentConfigi();
  const currentConfig = useBibleScreenTranslationConfig(props.screeni ?? currentConfigi);

  const isActualVisible = useIsScreenTranslationTextVisible();

  const config = useScreenTranslationCurrentConfig();

  return (
    <BibleTranslationScreen
      {...props}
      bibleConfig={currentConfig}
      windowResizeUpdatesNum={config?.proportion}
      isVisible={props.isPreview ? true : isActualVisible}
    />
  );
}
