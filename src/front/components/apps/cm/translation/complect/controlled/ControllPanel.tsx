import { ScreenTranslationControlPanel } from '../../../../../../06-entities/translation/ControllPanel';
import { useCmScreenTranslationComTextNavigations } from '../hooks/com-texts';

export const CmTranslationControlPanel = () => {
  const { nextText, prevText } = useCmScreenTranslationComTextNavigations();

  return (
    <ScreenTranslationControlPanel
      onNext={nextText}
      onPrev={prevText}
    />
  );
};
