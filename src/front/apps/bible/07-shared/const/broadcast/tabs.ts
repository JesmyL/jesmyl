import { translateBase } from '#basis/locale';
import { BroadcastGridTabDict } from '#widgets/broadcast/model/TabConfig';
import { BibleBroadcastTabId } from '$bible/shared/model/broadcast';
import React from 'react';

export const bibleBroadcastTabConfigDict: BroadcastGridTabDict<BibleBroadcastTabId> = {
  [BibleBroadcastTabId.Preview]: {
    title: () => translateBase(it => it.preview),
    Comp: React.lazy(() => import('$bible/widgets/BroadcastPreview').then(m => ({ default: m.BibleBroadcastPreview }))),
  },

  [BibleBroadcastTabId.Slide]: {
    title: () => translateBase(it => it.slide),
    Comp: React.lazy(() =>
      import('$bible/widgets/BroadcastCurrentSlidePreview').then(m => ({
        default: m.BibleBroadcastCurrentSlidePreview,
      })),
    ),
  },

  [BibleBroadcastTabId.Configs]: {
    title: () => translateBase(it => it.configs),
    Comp: React.lazy(() =>
      import('$bible/widgets/broadcast').then(m => ({ default: m.BibleBroadcastScreenConfigurations })),
    ),
  },

  [BibleBroadcastTabId.List]: {
    title: () => translateBase(it => it.lists),
    Comp: React.lazy(() => import('$bible/entities/broadcast-list').then(m => ({ default: m.BibleBroadcastList }))),
  },

  [BibleBroadcastTabId.History]: {
    title: () => translateBase(it => it.history),
    Comp: React.lazy(() =>
      import('$bible/entities/broadcast-history').then(m => ({ default: m.BibleBroadcastHistoryArchive })),
    ),
    htmlTitle: () => 'F1 F1',
  },

  [BibleBroadcastTabId.Plan]: {
    title: () => translateBase(it => it.plan),
    htmlTitle: () => 'F1; Ctrl+Enter - добавить в План',
    Comp: React.lazy(() =>
      import('$bible/entities/broadcast-plan').then(m => ({ default: m.BibleBroadcastPlanArchive })),
    ),
  },

  [BibleBroadcastTabId.Search]: {
    title: () => translateBase(it => it.search),
    Comp: React.lazy(() =>
      import('$bible/entities/broadcast-search').then(m => ({ default: m.BibleBroadcastSearchPanel })),
    ),
  },

  [BibleBroadcastTabId.Control]: {
    title: () => translateBase(it => it.control),
    Comp: React.lazy(() => import('$bible/widgets/BroadcastControl').then(m => ({ default: m.BibleBroadcastControl }))),
  },

  [BibleBroadcastTabId.Alert]: {
    title: () => translateBase(it => it.alert),
    Comp: React.lazy(() =>
      import('#features/broadcast/controls/alert-line/AlertLineInput').then(m => ({ default: m.AlertLineInput })),
    ),
  },

  [BibleBroadcastTabId.WorkDir]: {
    title: () => translateBase(it => it.folder),
    Comp: React.lazy(() => import('#features/ElectronWorkDir').then(m => ({ default: m.ElectronWorkDir }))),
  },
};
