import { useIsScreenTranslationTextVisible } from '../../../+complect/translations/atoms';
import {
  useScreenTranslationCurrentConfig,
  useScreenTranslationCurrentConfigi,
} from '../../../+complect/translations/hooks/configs';
import { TranslationScreenProps } from '../../../../../07-basis/model/Translations.model';
import { useBibleScreenTranslationConfig } from '../hooks/configs';
import { BibleTranslationScreen } from './BibleTranslationScreen';

export default function BibleTranslationCurrentScreen(props: TranslationScreenProps) {
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
