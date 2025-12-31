import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { CmEditorTabComRepeats } from '$cm+editor/widgets/TabComRepeats';
import { CmEditorComTabAudio } from '../ui/TabComAudio';
import { CmEditorComTabAudioMarks } from '../ui/TabComAudioMarks';
import { CmEditorComTabCategoryBinds } from '../ui/TabComCategoryBinds';
import { CmEditorComTabChordApplications } from '../ui/TabComChordApplications';
import { CmEditorComTabChordsBlocks } from '../ui/TabComChordsBlocks';
import { CmEditorComTabMain } from '../ui/TabComMain';
import { CmEditorComTabComOnBroadcast } from '../ui/TabComOnBroadcast';
import { CmEditorComTabComOrders } from '../ui/TabComOrders';
import { CmEditorComTabTextBlocks } from '../ui/TabComTextBlocks';
import { CmEditorComTabWatch } from '../ui/TabComWatch';

export const cmEditorComTabCompositionNavs = {
  watch: {
    Component: CmEditorComTabWatch,
    icon: 'View',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM'),
  },
  aps: {
    Component: CmEditorComTabChordApplications,
    icon: 'Umbrella',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_APPS'),
  },
  ord: {
    Component: CmEditorComTabComOrders,
    icon: 'DistributeVerticalTop',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_ORD'),
  },
  txt: {
    Component: CmEditorComTabTextBlocks,
    icon: 'TextVerticalAlignment',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_TXT'),
  },
  ch: {
    Component: CmEditorComTabChordsBlocks,
    icon: 'Playlist03',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_CH'),
  },
  audio: {
    Component: CmEditorComTabAudio,
    icon: 'Voice',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_AUDIO'),
  },
  points: {
    Component: CmEditorComTabAudioMarks,
    icon: 'PinLocation01',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_AMARK'),
  },
  cat: {
    Component: CmEditorComTabCategoryBinds,
    icon: 'BookOpen02',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_CAT'),
  },
  rep: {
    Component: CmEditorTabComRepeats,
    icon: 'Layers01',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_REP'),
  },
  tr: {
    Component: CmEditorComTabComOnBroadcast,
    icon: 'Computer',
    checkTabAccess: checkAccess => checkAccess('cm', 'COM_TR'),
  },
  main: {
    Component: CmEditorComTabMain,
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
