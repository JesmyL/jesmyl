import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import React from 'react';
import { IndexAppAccessRightTitles } from 'shared/model/index/access-rights';

const CmEditorTabComAudioMarks = React.lazy(() =>
  import('$cm+editor/widgets/TabComAudioMarks').then(m => ({ default: m.CmEditorTabComAudioMarks })),
);
const CmEditorTabComRepeats = React.lazy(() =>
  import('$cm+editor/widgets/TabComRepeats').then(m => ({ default: m.CmEditorTabComRepeats })),
);
const CmEditorComTabAudio = React.lazy(() =>
  import('../ui/TabComAudio').then(m => ({ default: m.CmEditorComTabAudio })),
);
const CmEditorComTabComBroadcast = React.lazy(() =>
  import('../ui/TabComBroadcast').then(m => ({ default: m.CmEditorComTabComBroadcast })),
);
const CmEditorComTabCategoryBinds = React.lazy(() =>
  import('../ui/TabComCategoryBinds').then(m => ({ default: m.CmEditorComTabCategoryBinds })),
);
const CmEditorComTabChordApplications = React.lazy(() =>
  import('../ui/TabComChordApplications').then(m => ({ default: m.CmEditorComTabChordApplications })),
);
const CmEditorComTabChordsBlocks = React.lazy(() =>
  import('../ui/TabComChordsBlocks').then(m => ({ default: m.CmEditorComTabChordsBlocks })),
);
const CmEditorComTabMain = React.lazy(() => import('../ui/TabComMain').then(m => ({ default: m.CmEditorComTabMain })));
const CmEditorComTabComOrders = React.lazy(() =>
  import('../ui/TabComOrders').then(m => ({ default: m.CmEditorComTabComOrders })),
);
const CmEditorComTabComRefs = React.lazy(() =>
  import('../ui/TabComRefs').then(m => ({ default: m.CmEditorComTabComRefs })),
);
const CmEditorComTabTextBlocks = React.lazy(() =>
  import('../ui/TabComTextBlocks').then(m => ({ default: m.CmEditorComTabTextBlocks })),
);
const CmEditorComTabWatch = React.lazy(() =>
  import('../ui/TabComWatch').then(m => ({ default: m.CmEditorComTabWatch })),
);

export const cmEditorComTabCompositionNavs = {
  watch: {
    Component: CmEditorComTabWatch,
    icon: 'View',
    scope: 'COM',
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
  ord: {
    Component: CmEditorComTabComOrders,
    icon: 'DistributeVerticalTop',
    scope: 'COM_ORD',
  },
  aps: {
    Component: CmEditorComTabChordApplications,
    icon: 'Umbrella',
    scope: 'COM_APPS',
  },
  rep: {
    Component: CmEditorTabComRepeats,
    icon: 'Layers01',
    scope: 'COM_REP',
  },
  cat: {
    Component: CmEditorComTabCategoryBinds,
    icon: 'BookOpen02',
    scope: 'COM_CAT',
  },
  audio: {
    Component: CmEditorComTabAudio,
    icon: 'Voice',
    scope: 'COM_AUDIO',
  },
  tr: {
    Component: CmEditorComTabComBroadcast,
    icon: 'Computer',
    scope: 'COM_TR',
  },
  points: {
    Component: CmEditorTabComAudioMarks,
    icon: 'PinLocation01',
    scope: 'COM_AMARK',
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
