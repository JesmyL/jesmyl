import { isTouchDevice } from '#shared/lib/device-differences';
import { CmTranslationControlled } from '$cm/widgets/translation';
import { CurrentForceViweAppContext } from 'front/components/apps/+complect/translations/Translation.contexts';
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
