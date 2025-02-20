import { useIsScreenTranslationTextVisible } from '#features/translations/lib/atoms';
import {
  useScreenTranslationCurrentConfig,
  useScreenTranslationCurrentConfigi,
} from '#features/translations/lib/hooks/configs';
import { TranslationScreenProps } from '#features/translations/model/Translations.model';
import { useBibleScreenTranslationConfig } from '../hooks/configs';
import { BibleTranslationScreen } from './BibleTranslationScreen';

export const BibleTranslationCurrentScreen = (props: TranslationScreenProps) => {
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
};
