import { TranslationScreenProps } from '../../../../../+complect/translations/Translations.model';
import {
  useGetScreenTranslationConfig,
  useScreenTranslationCurrentConfigi,
} from '../../../../../+complect/translations/hooks/configs';
import { useIsScreenTranslationTextVisible } from '../../../../../+complect/translations/hooks/is-visible';
import { FontSizeContainProps } from '../../../../base/font-size-contain/FontSizeContain.model';
import { useCmScreenTranslationComCurrentTexti } from '../../hooks/com-texts';
import { useCmCurrentComTexts } from '../../hooks/get-com-text';
import { useCmScreenTranslationConfig } from '../hooks/configs';
import { CmTranslationScreen } from './CmTranslationScreen';
import { useScreenWinResizeListen } from './hooks/win-resize-lesten';

const emptyArr: [] = [];

export const CmTranslationCurrentScreen = (props: TranslationScreenProps & Partial<FontSizeContainProps>) => {
  const getCurrentConfig = useGetScreenTranslationConfig();
  const currentConfigi = useScreenTranslationCurrentConfigi();
  const currentConfig = useCmScreenTranslationConfig(props.screeni ?? currentConfigi);
  const texts = useCmCurrentComTexts();
  const currTexti = useCmScreenTranslationComCurrentTexti();
  const forceUpdates = useScreenWinResizeListen(props.win);
  const isVisible = useIsScreenTranslationTextVisible();

  return (
    <CmTranslationScreen
      {...props}
      cmConfig={currentConfig}
      texti={currTexti}
      texts={texts ?? emptyArr}
      isVisible={isVisible}
      subUpdates={'' + currentConfigi + forceUpdates + getCurrentConfig(currentConfigi)?.proportion}
    />
  );
};
