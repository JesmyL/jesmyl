import { CurrentForceViweAppContext } from '../../+complect/translations/Translation.contexts';
import { isTouchDevice } from '../../../../complect/device-differences';
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
