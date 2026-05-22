import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { CmEditorTabComAudioMarks } from '$cm+editor/widgets/TabComAudioMarks';
import { CmEditorTabComRepeats } from '$cm+editor/widgets/TabComRepeats';
import { IndexAppAccessRightTitles } from 'shared/model/index/access-rights';
import { CmEditorComTabAudio } from '../ui/TabComAudio';
import { CmEditorComTabCategoryBinds } from '../ui/TabComCategoryBinds';
import { CmEditorComTabChordApplications } from '../ui/TabComChordApplications';
import { CmEditorComTabChordsBlocks } from '../ui/TabComChordsBlocks';
import { CmEditorComTabMain } from '../ui/TabComMain';
import { CmEditorComTabComNewLiner } from '../ui/TabComNewLiner';
import { CmEditorComTabComOrders } from '../ui/TabComOrders';
import { CmEditorComTabComRefs } from '../ui/TabComRefs';
import { CmEditorComTabTextBlocks } from '../ui/TabComTextBlocks';
import { CmEditorComTabWatch } from '../ui/TabComWatch';

export const cmEditorComTabCompositionNavs = {
  watch: {
    Component: CmEditorComTabWatch,
    icon: 'View',
    scope: 'COM',
  },
  aps: {
    Component: CmEditorComTabChordApplications,
    icon: 'Umbrella',
    scope: 'COM_APPS',
  },
  ord: {
    Component: CmEditorComTabComOrders,
    icon: 'DistributeVerticalTop',
    scope: 'COM_ORD',
  },
  txt: {
    Component: CmEditorComTabTextBlocks,
    icon: 'TextVerticalAlignment',
    scope: 'COM_TXT',
  },
  ch: {
    Component: CmEditorComTabChordsBlocks,
    icon: 'Playlist03',
    scope: 'COM_CH',
  },
  audio: {
    Component: CmEditorComTabAudio,
    icon: 'Voice',
    scope: 'COM_AUDIO',
  },
  points: {
    Component: CmEditorTabComAudioMarks,
    icon: 'PinLocation01',
    scope: 'COM_AMARK',
  },
  cat: {
    Component: CmEditorComTabCategoryBinds,
    icon: 'BookOpen02',
    scope: 'COM_CAT',
  },
  rep: {
    Component: CmEditorTabComRepeats,
    icon: 'Layers01',
    scope: 'COM_REP',
  },
  tr: {
    Component: CmEditorComTabComNewLiner,
    icon: 'Computer',
    scope: 'COM_TR',
  },
  ref: {
    Component: CmEditorComTabComRefs,
    icon: 'Link01',
    scope: 'COM_REF',
  },
  main: {
    Component: CmEditorComTabMain,
    icon: 'SchoolReportCard',
    scope: 'COM_MAIN',
  },
} satisfies Record<
  string,
  {
    Component: (props: { ccom: EditableCom }) => React.ReactNode;
    icon: KnownStameskaIconName;
    scope: keyof OmitOwn<IndexAppAccessRightTitles['cm'], 'info'>;
  }
>;
