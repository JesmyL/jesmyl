import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { CmEditorTabComAudio } from '$cm+editor/widgets/TabComAudio';
import { CmEditorTabComAudioMarks } from '$cm+editor/widgets/TabComAudioMarks';
import { CmEditorTabComCategoryBinds } from '$cm+editor/widgets/TabComCategoryBinds';
import { CmEditorTabComChordApplications } from '$cm+editor/widgets/TabComChordApplications';
import { CmEditorTabComChordsBlocks } from '$cm+editor/widgets/TabComChordsBlocks';
import { CmEditorTabComMain } from '$cm+editor/widgets/TabComMain';
import { CmEditorTabComOnTranslations } from '$cm+editor/widgets/TabComOnTranslations';
import { CmEditorTabComOrders } from '$cm+editor/widgets/TabComOrders';
import { CmEditorTabComRepeats } from '$cm+editor/widgets/TabComRepeats';
import { CmEditorTabTextBlocks } from '$cm+editor/widgets/TabComTextBlocks';
import { CmEditorTabWatch } from '$cm+editor/widgets/TabComWatch';
import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';

export const editCompositionNavs = {
  watch: {
    Component: CmEditorTabWatch,
    icon: 'View',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM'),
  },
  aps: {
    Component: CmEditorTabComChordApplications,
    icon: 'Umbrella',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_APPS'),
  },
  ord: {
    Component: CmEditorTabComOrders,
    icon: 'DistributeVerticalTop',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_ORD'),
  },
  txt: {
    Component: CmEditorTabTextBlocks,
    icon: 'TextVerticalAlignment',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_TXT'),
  },
  ch: {
    Component: CmEditorTabComChordsBlocks,
    icon: 'Playlist03',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_CH'),
  },
  audio: {
    Component: CmEditorTabComAudio,
    icon: 'Voice',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_AUDIO'),
  },
  cat: {
    Component: CmEditorTabComCategoryBinds,
    icon: 'BookOpen02',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_CAT'),
  },
  rep: {
    Component: CmEditorTabComRepeats,
    icon: 'Layers01',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_REP'),
  },
  points: {
    Component: CmEditorTabComAudioMarks,
    icon: 'PinLocation01',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_AMARK'),
  },
  tr: {
    Component: CmEditorTabComOnTranslations,
    icon: 'Computer',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_TR'),
  },
  main: {
    Component: CmEditorTabComMain,
    icon: 'SchoolReportCard',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_MAIN'),
  },
} satisfies Record<
  string,
  {
    Component: (props: { ccom: EditableCom }) => React.ReactNode;
    icon: KnownStameskaIconName;
    checkTabAccess: (checker: ReturnType<typeof useCheckUserAccessRightsInScope>) => void;
  }
>;
