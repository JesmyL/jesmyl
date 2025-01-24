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
    phase: [''],
    path: '',
    element: <EditableCompositionWatch />,
    data: {
      iconPack: iconPackOfView,
    },
  },
  {
    phase: ['aps'],
    path: 'aps',
    element: <ChordApplicationsRedactor />,
    data: {
      iconPack: iconPackOfUmbrella,
    },
  },
  {
    phase: ['ord'],
    path: 'ord',
    element: <OrdersRedactor />,
    data: {
      iconPack: iconPackOfDistributeVerticalTop,
    },
  },
  {
    phase: ['txt'],
    path: 'txt',
    element: <CmTextBlocksRedactor />,
    data: {
      iconPack: iconPackOfTextVerticalAlignment,
    },
  },
  {
    phase: ['ch'],
    path: 'ch',
    element: <CmChordsBlocksRedactor />,
    data: {
      iconPack: iconPackOfPlaylist03,
    },
  },
  {
    phase: ['audio'],
    path: 'audio',
    element: <ComAudioTab />,
    data: {
      iconPack: iconPackOfVoice,
    },
  },
  {
    phase: ['cat'],
    path: 'cat',
    element: <CategoryBinds />,
    data: {
      iconPack: iconPackOfBookOpen02,
    },
  },
  {
    phase: ['rep'],
    path: 'rep',
    element: <ComRepeats />,
    data: {
      iconPack: iconPackOfLayers01,
    },
  },
  {
    phase: ['tr'],
    path: 'tr',
    element: <ComOnTranslations />,
    data: {
      iconPack: iconPackOfComputer,
    },
  },
  {
    phase: ['main'],
    path: 'main',
    element: <EditableCompositionMain />,
    data: {
      iconPack: iconPackOfSchoolReportCard,
    },
  },
] as const;
