import { isTouchDevice } from '#shared/lib/device-differences';
import { CurrentForceViweAppContext } from '../../+complect/translations/Translation.contexts';
import { CmTranslationControlled } from './complect/controlled/CmTranslationControlled';
import { TranslationFullscreen } from './complect/fullscreen/TranslationFullscreen';

export const CmTranslations = () => {
  return (
    <>
      <CurrentForceViweAppContext value="cm">
        {isTouchDevice ? <TranslationFullscreen /> : <CmTranslationControlled />}
      </CurrentForceViweAppContext>
    </>
  );
};
