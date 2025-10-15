import { useIsScreenTranslationTextVisible } from '#features/broadcast/atoms';
import {
  useScreenTranslationCurrentConfig,
  useScreenTranslationCurrentConfigi,
} from '#features/broadcast/hooks/configs';
import { TranslationScreenProps } from '#features/broadcast/Translations.model';
import { useBibleBroadcastScreenConfig } from '../../broadcast/config/configs';
import { BibleBroadcastScreenScreen } from './BibleTranslationScreen';

export function BibleBroadcastScreenCurrentScreen(props: TranslationScreenProps) {
  const currentConfigi = useScreenTranslationCurrentConfigi();
  const currentConfig = useBibleBroadcastScreenConfig(props.screeni ?? currentConfigi);

  const isActualVisible = useIsScreenTranslationTextVisible();

  const config = useScreenTranslationCurrentConfig();

  return (
    <BibleBroadcastScreenScreen
      {...props}
      bibleConfig={currentConfig}
      windowResizeUpdatesNum={config?.proportion}
      isVisible={props.isPreview ? true : isActualVisible}
    />
  );
}
