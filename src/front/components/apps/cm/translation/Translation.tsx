import { CurrentForceViweAppContext } from '#features/translations/lib/Translation.contexts';
import { isTouchDevice } from '#shared/lib/device-detections';
import { CmTranslationControlled } from './complect/controlled/CmTranslationControlled';
import { TranslationFullscreen } from './complect/fullscreen/TranslationFullscreen';

export function Translations() {
  return (
    <>
      <CurrentForceViweAppContext.Provider value="cm">
        {isTouchDevice ? <TranslationFullscreen /> : <CmTranslationControlled />}
      </CurrentForceViweAppContext.Provider>
    </>
  );
}
