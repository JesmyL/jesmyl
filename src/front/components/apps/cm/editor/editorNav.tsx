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

export const editCompositionNavs: { path: string; Component: React.FC; icon: TheIconKnownName }[] = [
  {
    path: '',
    Component: EditableCompositionWatch,
    icon: 'View',
  },
  {
    path: 'aps',
    Component: ChordApplicationsRedactor,
    icon: 'Umbrella',
  },
  {
    path: 'ord',
    Component: OrdersRedactor,
    icon: 'DistributeVerticalTop',
  },
  {
    path: 'txt',
    Component: CmTextBlocksRedactor,
    icon: 'TextVerticalAlignment',
  },
  {
    path: 'ch',
    Component: CmChordsBlocksRedactor,
    icon: 'Playlist03',
  },
  {
    path: 'audio',
    Component: ComAudioTab,
    icon: 'Voice',
  },
  {
    path: 'cat',
    Component: CategoryBinds,
    icon: 'BookOpen02',
  },
  {
    path: 'rep',
    Component: ComRepeats,
    icon: 'Layers01',
  },
  {
    path: 'tr',
    Component: ComOnTranslations,
    icon: 'Computer',
  },
  {
    path: 'main',
    Component: EditableCompositionMain,
    icon: 'SchoolReportCard',
  },
] as const;
