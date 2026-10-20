import { translateBase } from '#basis/locale';
import { BroadcastGridTabDict } from '#widgets/broadcast/model/TabConfig';
import { BibleBroadcastTabId } from '$bible/shared/model/broadcast';
import React from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const bibleBroadcastTabConfigDict: BroadcastGridTabDict<BibleBroadcastTabId> = {
  [BibleBroadcastTabId.Preview]: {
    title: () => translateBase(BaseLocaleKey.Preview),
    Comp: React.lazy(() => import('$bible/widgets/BroadcastPreview').then(m => ({ default: m.BibleBroadcastPreview }))),
  },

  [BibleBroadcastTabId.Slide]: {
    title: () => translateBase(BaseLocaleKey.Slide),
    Comp: React.lazy(() =>
      import('$bible/widgets/BroadcastCurrentSlidePreview').then(m => ({
        default: m.BibleBroadcastCurrentSlidePreview,
      })),
    ),
  },

  [BibleBroadcastTabId.Configs]: {
    title: () => translateBase(BaseLocaleKey.Configs),
    Comp: React.lazy(() =>
      import('$bible/widgets/broadcast').then(m => ({ default: m.BibleBroadcastScreenConfigurations })),
    ),
  },

  [BibleBroadcastTabId.List]: {
    title: () => translateBase(BaseLocaleKey.Lists),
    Comp: React.lazy(() => import('$bible/entities/broadcast-list').then(m => ({ default: m.BibleBroadcastList }))),
  },

  [BibleBroadcastTabId.History]: {
    title: () => translateBase(BaseLocaleKey.History),
    Comp: React.lazy(() =>
      import('$bible/entities/broadcast-history').then(m => ({ default: m.BibleBroadcastHistoryArchive })),
    ),
    htmlTitle: () => 'F1 F1',
  },

  [BibleBroadcastTabId.Plan]: {
    title: () => translateBase(BaseLocaleKey.Plan),
    htmlTitle: () => translateBase(BaseLocaleKey.BibleAddToPlan),
    Comp: React.lazy(() =>
      import('$bible/entities/broadcast-plan').then(m => ({ default: m.BibleBroadcastPlanArchive })),
    ),
  },

  [BibleBroadcastTabId.Search]: {
    title: () => translateBase(BaseLocaleKey.Search),
    Comp: React.lazy(() =>
      import('$bible/entities/broadcast-search').then(m => ({ default: m.BibleBroadcastSearchPanel })),
    ),
  },

  [BibleBroadcastTabId.Control]: {
    title: () => translateBase(BaseLocaleKey.Control),
    Comp: React.lazy(() => import('$bible/widgets/BroadcastControl').then(m => ({ default: m.BibleBroadcastControl }))),
  },

  [BibleBroadcastTabId.Alert]: {
    title: () => translateBase(BaseLocaleKey.Alert),
    Comp: React.lazy(() =>
      import('#features/broadcast/controls/alert-line/AlertLineInput').then(m => ({ default: m.AlertLineInput })),
    ),
  },

  [BibleBroadcastTabId.WorkDir]: {
    title: () => translateBase(BaseLocaleKey.Folder),
    Comp: React.lazy(() => import('$bible/widgets/BroadcastWorkDir').then(m => ({ default: m.BibleBroadcastWorkDir }))),
  },
};
