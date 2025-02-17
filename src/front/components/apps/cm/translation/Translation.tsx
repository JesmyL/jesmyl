import { CurrentForceViweAppContext } from '../../+complect/translations/Translation.contexts';
import { isTouchDevice } from '../../../../07-shared/lib/device-differences';
import CmTranslationControlled from './complect/controlled/CmTranslationControlled';
import TranslationFullscreen from './complect/fullscreen/TranslationFullscreen';

export default function Translations() {
  return (
    <>
      <CurrentForceViweAppContext.Provider value="cm">
        {isTouchDevice ? <TranslationFullscreen /> : <CmTranslationControlled />}
      </CurrentForceViweAppContext.Provider>
    </>
  );
}
