import { CurrentForceViweAppContext } from '#features/translations/Translation.contexts';
import { isTouchDevice } from '#shared/lib/device-differences';
import { CmTranslationControlled } from '$cm/widgets/translation';
import { CmTranslationFullscreen } from './TranslationFullscreen';

export const CmTranslation = () => {
  return (
    <>
      <CurrentForceViweAppContext value="cm">
        {isTouchDevice ? <CmTranslationFullscreen /> : <CmTranslationControlled />}
      </CurrentForceViweAppContext>
    </>
  );
};
