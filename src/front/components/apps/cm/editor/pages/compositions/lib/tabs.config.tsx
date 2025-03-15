import { CmComAudioRedactorTab } from '../ui/tabs/Audio';
import { CmCategoryBindsRedactorTab } from '../ui/tabs/CategoryBinds';
import { CmChordApplicationsRedactorTab } from '../ui/tabs/ChordApplications';
import { CmEditableCompositionMainTab } from '../ui/tabs/Main';
import { CmOrdersRedactorTab } from '../ui/tabs/Orders';
import { CmComRepeatsRedactorTab } from '../ui/tabs/Repeats';
import { CmChordsBlocksRedactorTab, CmTextBlocksRedactorTab } from '../ui/tabs/TextableBlocks';
import { CmComOnTranslationsRedactorTab } from '../ui/tabs/Translations';
import { CmEditableCompositionWatchTab } from '../ui/tabs/Watch/ui';

export const editCompositionNavs = {
  watch: {
    Component: CmEditableCompositionWatchTab,
    icon: 'View',
  },
  aps: {
    Component: CmChordApplicationsRedactorTab,
    icon: 'Umbrella',
  },
  ord: {
    Component: CmOrdersRedactorTab,
    icon: 'DistributeVerticalTop',
  },
  txt: {
    Component: CmTextBlocksRedactorTab,
    icon: 'TextVerticalAlignment',
  },
  ch: {
    Component: CmChordsBlocksRedactorTab,
    icon: 'Playlist03',
  },
  audio: {
    Component: CmComAudioRedactorTab,
    icon: 'Voice',
  },
  cat: {
    Component: CmCategoryBindsRedactorTab,
    icon: 'BookOpen02',
  },
  rep: {
    Component: CmComRepeatsRedactorTab,
    icon: 'Layers01',
  },
  tr: {
    Component: CmComOnTranslationsRedactorTab,
    icon: 'Computer',
  },
  main: {
    Component: CmEditableCompositionMainTab,
    icon: 'SchoolReportCard',
  },
} as const;
