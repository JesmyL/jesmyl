import { ScreenTranslationControlPanel } from '#features/broadcast/controls/ControllPanel';
import { useCmTranslationScreenComTextNavigations } from '$cm/features/translation';

export const CmTranslationControlPanel = () => {
  const { nextText, prevText } = useCmTranslationScreenComTextNavigations();

  return (
    <ScreenTranslationControlPanel
      onNext={nextText}
      onPrev={prevText}
    />
  );
};
