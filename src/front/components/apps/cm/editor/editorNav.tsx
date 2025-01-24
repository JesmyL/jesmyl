import React from 'react';
import {
  INavigationRouteChildItem,
  INavigationRouteRootItem,
} from '../../../../complect/nav-configurer/Navigation.model';
import { iconPackOfArrange } from '../../../../complect/the-icon/icons/arrange';
import { iconPackOfBookOpen01 } from '../../../../complect/the-icon/icons/book-open-01';
import { iconPackOfBookOpen02 } from '../../../../complect/the-icon/icons/book-open-02';
import { iconPackOfComputer } from '../../../../complect/the-icon/icons/computer';
import { iconPackOfDistributeVerticalTop } from '../../../../complect/the-icon/icons/distribute-vertical-top';
import { iconPackOfEdit02 } from '../../../../complect/the-icon/icons/edit-02';
import { iconPackOfHeadphones } from '../../../../complect/the-icon/icons/headphones';
import { iconPackOfLayers01 } from '../../../../complect/the-icon/icons/layers-01';
import { iconPackOfMusicNote01 } from '../../../../complect/the-icon/icons/music-note-01';
import { iconPackOfPlaylist03 } from '../../../../complect/the-icon/icons/playlist-03';
import { iconPackOfSchoolReportCard } from '../../../../complect/the-icon/icons/school-report-card';
import { iconPackOfText } from '../../../../complect/the-icon/icons/text';
import { iconPackOfTextVerticalAlignment } from '../../../../complect/the-icon/icons/text-vertical-alignment';
import { iconPackOfUmbrella } from '../../../../complect/the-icon/icons/umbrella';
import { iconPackOfView } from '../../../../complect/the-icon/icons/view';
import { iconPackOfVoice } from '../../../../complect/the-icon/icons/voice';
import { TheIconSelfPack } from '../../../../complect/the-icon/model';
import { RoutePhasePoint } from '../../../router/Router.model';
import { CmNavData } from '../Cm.model';
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

const LazyTheComposition = React.lazy(() => import('../col/com/TheComposition'));
const LazyEditor = React.lazy(() => import('./Editor'));
const LazyChordRedactor = React.lazy(() => import('./chord-redactor/ChordRedactor'));
const LazyEditCategories = React.lazy(() => import('./col/categories/EditCategories'));
const LazyEditCategory = React.lazy(() => import('./col/categories/EditCategory'));
const LazyEditComposition = React.lazy(() => import('./col/compositions/EditComposition'));
const LazyEditCompositions = React.lazy(() => import('./col/compositions/EditCompositions'));

const LazyEERules = React.lazy(() => import('./ee-rules/EERules'));
const LazyMp3RulesRedactor = React.lazy(() => import('./mp3-rule-redactor/Mp3RulesRedactor'));

export const editCompositionNavs: INavigationRouteChildItem<
  CmNavData,
  {
    iconPack?: TheIconSelfPack;
    iconText?: string;
  }
>[] = [
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
];

export const editComNavPhasePoint: RoutePhasePoint = ['com'];
export const editEventNavPhasePoint: RoutePhasePoint = ['event'];

export const editorRouteItems: INavigationRouteChildItem<
  CmNavData,
  {
    title: string;
    iconSelfPack: TheIconSelfPack;
  }
>[] = [
  {
    phase: ['cats'],
    node: <LazyEditCategories />,
    accessLevel: 100,
    data: {
      title: 'Категории',
      iconSelfPack: iconPackOfBookOpen01,
    },
    next: [
      {
        phase: ['cat'],
        node: <LazyEditCategory />,
      },
    ],
  },
  {
    phase: ['coms'],
    node: <LazyEditCompositions />,
    data: {
      title: 'Песни',
      iconSelfPack: iconPackOfHeadphones,
    },
    next: [
      {
        phase: editComNavPhasePoint,
        node: props => <LazyEditComposition />,
        next: editCompositionNavs,
      },
    ],
  },
  {
    phase: ['chord'],
    node: <LazyChordRedactor />,
    accessLevel: 50,
    data: {
      title: '',
      iconSelfPack: iconPackOfArrange,
    },
  },
  {
    phase: [''],
    node: <LazyMp3RulesRedactor />,
    accessLevel: 80,
    data: {
      title: '',
      iconSelfPack: iconPackOfMusicNote01,
    },
  },
  {
    phase: ['e-e'],
    node: <LazyEERules />,
    accessLevel: 100,
    data: {
      title: '',
      iconSelfPack: iconPackOfText,
    },
  },
];

export const editorNav: INavigationRouteRootItem<CmNavData> = {
  phase: [''],
  node: <LazyEditor />,
  title: '',
  iconSelfPack: iconPackOfEdit02,
  accessLevel: 50,
  next: editorRouteItems,
};
