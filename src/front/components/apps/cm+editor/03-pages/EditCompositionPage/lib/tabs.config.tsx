import { CmEditorTabComAudio } from '$cm+editor/widgets/TabComAudio';
import { CmEditorTabComCategoryBinds } from '$cm+editor/widgets/TabComCategoryBinds';
import { CmEditorTabComChordApplications } from '$cm+editor/widgets/TabComChordApplications';
import { CmEditorTabComChordsBlocks } from '$cm+editor/widgets/TabComChordsBlocks';
import { CmEditorTabComMain } from '$cm+editor/widgets/TabComMain';
import { CmEditorTabComOnTranslations } from '$cm+editor/widgets/TabComOnTranslations';
import { CmEditorTabComOrders } from '$cm+editor/widgets/TabComOrders';
import { CmEditorTabComRepeats } from '$cm+editor/widgets/TabComRepeats';
import { CmEditorTabTextBlocks } from '$cm+editor/widgets/TabComTextBlocks';
import { CmEditorTabWatch } from '$cm+editor/widgets/TabComWatch';

export const editCompositionNavs = {
  watch: {
    Component: CmEditorTabWatch,
    icon: 'View',
  },
  aps: {
    Component: CmEditorTabComChordApplications,
    icon: 'Umbrella',
  },
  ord: {
    Component: CmEditorTabComOrders,
    icon: 'DistributeVerticalTop',
  },
  txt: {
    Component: CmEditorTabTextBlocks,
    icon: 'TextVerticalAlignment',
  },
  ch: {
    Component: CmEditorTabComChordsBlocks,
    icon: 'Playlist03',
  },
  audio: {
    Component: CmEditorTabComAudio,
    icon: 'Voice',
  },
  cat: {
    Component: CmEditorTabComCategoryBinds,
    icon: 'BookOpen02',
  },
  rep: {
    Component: CmEditorTabComRepeats,
    icon: 'Layers01',
  },
  tr: {
    Component: CmEditorTabComOnTranslations,
    icon: 'Computer',
  },
  main: {
    Component: CmEditorTabComMain,
    icon: 'SchoolReportCard',
  },
} as const;
