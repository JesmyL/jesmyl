import { iconPackOfBookOpen02 } from '../../../../complect/the-icon/icons/book-open-02';
import { iconPackOfComputer } from '../../../../complect/the-icon/icons/computer';
import { iconPackOfDistributeVerticalTop } from '../../../../complect/the-icon/icons/distribute-vertical-top';
import { iconPackOfLayers01 } from '../../../../complect/the-icon/icons/layers-01';
import { iconPackOfPlaylist03 } from '../../../../complect/the-icon/icons/playlist-03';
import { iconPackOfSchoolReportCard } from '../../../../complect/the-icon/icons/school-report-card';
import { iconPackOfTextVerticalAlignment } from '../../../../complect/the-icon/icons/text-vertical-alignment';
import { iconPackOfUmbrella } from '../../../../complect/the-icon/icons/umbrella';
import { iconPackOfView } from '../../../../complect/the-icon/icons/view';
import { iconPackOfVoice } from '../../../../complect/the-icon/icons/voice';
import ComAudioTab from './col/compositions/complect/audio/Tab';
import CategoryBinds from './col/compositions/complect/CategoryBinds';
import ChordApplicationsRedactor from './col/compositions/complect/chord-applications/ChordApplicationsRedactor';
import ComOnTranslations from './col/compositions/complect/ComOnTranslations';
import EditableCompositionMain from './col/compositions/complect/main/EditableCompositionMain';
import OrdersRedactor from './col/compositions/complect/orders/OrdersRedactor';
import CmChordsBlocksRedactor from './col/compositions/complect/textable-blocks/chords-blocks/ChordsBlocksRedactor';
import { CmTextBlocksRedactor } from './col/compositions/complect/textable-blocks/text-blocks/TextBlocksRedactor';
import EditableCompositionWatch from './col/compositions/complect/Watch';
import ComRepeats from './col/compositions/repeats/ComRepeats';

export const editCompositionNavs = [
  {
    path: '',
    Component: EditableCompositionWatch,
    iconPack: iconPackOfView,
  },
  {
    path: 'aps',
    Component: ChordApplicationsRedactor,
    iconPack: iconPackOfUmbrella,
  },
  {
    path: 'ord',
    Component: OrdersRedactor,
    iconPack: iconPackOfDistributeVerticalTop,
  },
  {
    path: 'txt',
    Component: CmTextBlocksRedactor,
    iconPack: iconPackOfTextVerticalAlignment,
  },
  {
    path: 'ch',
    Component: CmChordsBlocksRedactor,
    iconPack: iconPackOfPlaylist03,
  },
  {
    path: 'audio',
    Component: ComAudioTab,
    iconPack: iconPackOfVoice,
  },
  {
    path: 'cat',
    Component: CategoryBinds,
    iconPack: iconPackOfBookOpen02,
  },
  {
    path: 'rep',
    Component: ComRepeats,
    iconPack: iconPackOfLayers01,
  },
  {
    path: 'tr',
    Component: ComOnTranslations,
    iconPack: iconPackOfComputer,
  },
  {
    path: 'main',
    Component: EditableCompositionMain,
    iconPack: iconPackOfSchoolReportCard,
  },
] as const;
