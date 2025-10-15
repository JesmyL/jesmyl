import { useCmTranslationScreenComTextNavigations } from '$cm/features/translation';
import { ScreenTranslationControlPanel } from 'front/components/apps/+complect/translations/controls/ControllPanel';

export const CmTranslationControlPanel = () => {
  const { nextText, prevText } = useCmTranslationScreenComTextNavigations();

  return (
    <ScreenTranslationControlPanel
      onNext={nextText}
      onPrev={prevText}
    />
  );
};
