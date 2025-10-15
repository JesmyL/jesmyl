import { useIsScreenTranslationTextVisible } from '#features/broadcast/atoms';
import { useGetScreenTranslationConfig, useScreenTranslationCurrentConfigi } from '#features/broadcast/hooks/configs';
import { TranslationScreenProps } from '#features/broadcast/Translations.model';
import { FontSizeContainProps } from '#shared/ui/font-size-contain/FontSizeContain.model';
import { cmTranslationBlockAtom } from '$cm/entities/translation';
import { useCmTranslationCurrentComTexts } from '$cm/features/translation';
import { useAtomValue } from 'atomaric';
import { useCmTranslationScreenConfig } from '../hooks/configs';
import { useCmTranslationScreenWinResizeListen } from '../lib/win-resize-lesten';
import { CmTranslationScreen } from './CmTranslationScreen';

export const CmTranslationCurrentScreen = (props: TranslationScreenProps & Partial<FontSizeContainProps>) => {
  const getCurrentConfig = useGetScreenTranslationConfig();
  const currentConfigi = useScreenTranslationCurrentConfigi();
  const currentConfig = useCmTranslationScreenConfig(props.screeni ?? currentConfigi);
  const texts = useCmTranslationCurrentComTexts(currentConfig?.pushKind);
  const currTexti = useAtomValue(cmTranslationBlockAtom);
  const forceUpdates = useCmTranslationScreenWinResizeListen(props.win);
  const isVisible = useIsScreenTranslationTextVisible();

  return (
    <CmTranslationScreen
      {...props}
      cmConfig={currentConfig}
      text={texts ? texts[currTexti] : ''}
      nextText={texts ? texts[currTexti + 1] || '' : ''}
      isVisible={isVisible}
      subUpdates={'' + currentConfigi + forceUpdates + getCurrentConfig(currentConfigi)?.proportion}
    />
  );
};
