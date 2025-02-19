import { TranslationScreenProps } from '../../../../../+complect/translations/Translations.model';
import { useIsScreenTranslationTextVisible } from '../../../../../+complect/translations/atoms';
import {
  useGetScreenTranslationConfig,
  useScreenTranslationCurrentConfigi,
} from '../../../../../+complect/translations/hooks/configs';
import { useAtomValue } from '../../../../../../../shared/lib/atom';
import { translationBlockAtom } from '../../../../atoms';
import { FontSizeContainProps } from '../../../../base/font-size-contain/FontSizeContain.model';
import { useCmCurrentComTexts } from '../../hooks/get-com-text';
import { useCmScreenTranslationConfig } from '../hooks/configs';
import { CmTranslationScreen } from './CmTranslationScreen';
import { useScreenWinResizeListen } from './hooks/win-resize-lesten';

export const CmTranslationCurrentScreen = (props: TranslationScreenProps & Partial<FontSizeContainProps>) => {
  const getCurrentConfig = useGetScreenTranslationConfig();
  const currentConfigi = useScreenTranslationCurrentConfigi();
  const currentConfig = useCmScreenTranslationConfig(props.screeni ?? currentConfigi);
  const texts = useCmCurrentComTexts(currentConfig?.pushKind);
  const currTexti = useAtomValue(translationBlockAtom);
  const forceUpdates = useScreenWinResizeListen(props.win);
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
