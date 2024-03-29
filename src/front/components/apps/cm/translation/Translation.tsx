import TranslationPage from '../../+complect/translations/TranslationPage';
import { isTouchDevice } from '../../../../complect/device-differences';
import useCmNav from '../base/useCmNav';
import TranslationFullscreen from './complect/fullscreen/TranslationFullscreen';

export default function Translations() {
  return isTouchDevice ? <TranslationFullscreen /> : <TranslationPage useNav={useCmNav as never} />;
}
