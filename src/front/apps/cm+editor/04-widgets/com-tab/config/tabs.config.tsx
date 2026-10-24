import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import React from 'react';
import { IndexAppAccessRightTitles } from 'shared/model/index/access-rights';

const importTabAudioMarks = () =>
  import('$cm+editor/widgets/TabComAudioMarks').then(m => ({ default: m.CmEditorTabComAudioMarks }));
const importTabRepeats = () =>
  import('$cm+editor/widgets/TabComRepeats').then(m => ({ default: m.CmEditorTabComRepeats }));
const importTabAudio = () => import('../ui/TabComAudio').then(m => ({ default: m.CmEditorComTabAudio }));
const importTabBroadcast = () => import('../ui/TabComBroadcast').then(m => ({ default: m.CmEditorComTabComBroadcast }));
const importTabCategoryBinds = () =>
  import('../ui/TabComCategoryBinds').then(m => ({ default: m.CmEditorComTabCategoryBinds }));
const importTabChordApplications = () =>
  import('../ui/TabComChordApplications').then(m => ({ default: m.CmEditorComTabChordApplications }));
const importTabChordsBlocks = () =>
  import('../ui/TabComChordsBlocks').then(m => ({ default: m.CmEditorComTabChordsBlocks }));
const importTabMain = () => import('../ui/TabComMain').then(m => ({ default: m.CmEditorComTabMain }));
const importTabOrders = () => import('../ui/TabComOrders').then(m => ({ default: m.CmEditorComTabComOrders }));
const importTabRefs = () => import('../ui/TabComRefs').then(m => ({ default: m.CmEditorComTabComRefs }));
const importTabTextBlocks = () => import('../ui/TabComTextBlocks').then(m => ({ default: m.CmEditorComTabTextBlocks }));
const importTabWatch = () => import('../ui/TabComWatch').then(m => ({ default: m.CmEditorComTabWatch }));

const CmEditorTabComAudioMarks = React.lazy(importTabAudioMarks);
const CmEditorTabComRepeats = React.lazy(importTabRepeats);
const CmEditorComTabAudio = React.lazy(importTabAudio);
const CmEditorComTabComBroadcast = React.lazy(importTabBroadcast);
const CmEditorComTabCategoryBinds = React.lazy(importTabCategoryBinds);
const CmEditorComTabChordApplications = React.lazy(importTabChordApplications);
const CmEditorComTabChordsBlocks = React.lazy(importTabChordsBlocks);
const CmEditorComTabMain = React.lazy(importTabMain);
const CmEditorComTabComOrders = React.lazy(importTabOrders);
const CmEditorComTabComRefs = React.lazy(importTabRefs);
const CmEditorComTabTextBlocks = React.lazy(importTabTextBlocks);
const CmEditorComTabWatch = React.lazy(importTabWatch);

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

/** Fetches every tab chunk so the tabs keep working after going offline. */
export const cmEditorComTabChunksPreload = () =>
  Promise.all(
    [
      importTabWatch,
      importTabTextBlocks,
      importTabChordsBlocks,
      importTabOrders,
      importTabChordApplications,
      importTabRepeats,
      importTabCategoryBinds,
      importTabAudio,
      importTabBroadcast,
      importTabAudioMarks,
      importTabRefs,
      importTabMain,
    ].map(importChunk => importChunk().catch(() => null)),
  );
