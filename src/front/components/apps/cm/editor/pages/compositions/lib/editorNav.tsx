import { CmComAudioRedactorTab } from '../ui/tabs/Audio';
import { CmCategoryBindsRedactorTab } from '../ui/tabs/CategoryBinds';
import { CmChordApplicationsRedactorTab } from '../ui/tabs/ChordApplications';
import { CmEditableCompositionMainTab } from '../ui/tabs/Main';
import { CmOrdersRedactorTab } from '../ui/tabs/Orders';
import { CmComRepeatsRedactorTab } from '../ui/tabs/Repeats';
import { CmChordsBlocksRedactorTab, CmTextBlocksRedactorTab } from '../ui/tabs/TextableBlocks';
import { CmComOnTranslationsRedactorTab } from '../ui/tabs/Translations';
import { CmEditableCompositionWatchTab } from '../ui/tabs/Watch/ui';

export const editCompositionNavs: { path: string; Component: React.FC; icon: TheIconKnownName }[] = [
  {
    path: '',
    Component: CmEditableCompositionWatchTab,
    icon: 'View',
  },
  {
    path: 'aps',
    Component: CmChordApplicationsRedactorTab,
    icon: 'Umbrella',
  },
  {
    path: 'ord',
    Component: CmOrdersRedactorTab,
    icon: 'DistributeVerticalTop',
  },
  {
    path: 'txt',
    Component: CmTextBlocksRedactorTab,
    icon: 'TextVerticalAlignment',
  },
  {
    path: 'ch',
    Component: CmChordsBlocksRedactorTab,
    icon: 'Playlist03',
  },
  {
    path: 'audio',
    Component: CmComAudioRedactorTab,
    icon: 'Voice',
  },
  {
    path: 'cat',
    Component: CmCategoryBindsRedactorTab,
    icon: 'BookOpen02',
  },
  {
    path: 'rep',
    Component: CmComRepeatsRedactorTab,
    icon: 'Layers01',
  },
  {
    path: 'tr',
    Component: CmComOnTranslationsRedactorTab,
    icon: 'Computer',
  },
  {
    path: 'main',
    Component: CmEditableCompositionMainTab,
    icon: 'SchoolReportCard',
  },
] as const;
