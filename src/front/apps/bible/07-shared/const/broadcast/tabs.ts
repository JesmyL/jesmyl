import { translateBase } from '#basis/locale';
import { BroadcastGridTabDict } from '#widgets/broadcast/model/TabConfig';
import { BibleBroadcastTabId } from '$bible/shared/model/broadcast';
import React from 'react';

const AlertLineInput = React.lazy(() =>
  import('#features/broadcast/controls/alert-line/AlertLineInput').then(m => ({ default: m.AlertLineInput })),
);
const BibleBroadcastHistoryArchive = React.lazy(() =>
  import('$bible/entities/broadcast-history').then(m => ({ default: m.BibleBroadcastHistoryArchive })),
);
const BibleBroadcastList = React.lazy(() =>
  import('$bible/entities/broadcast-list').then(m => ({ default: m.BibleBroadcastList })),
);
const BibleBroadcastPlanArchive = React.lazy(() =>
  import('$bible/entities/broadcast-plan').then(m => ({ default: m.BibleBroadcastPlanArchive })),
);
const BibleBroadcastSearchPanel = React.lazy(() =>
  import('$bible/entities/broadcast-search').then(m => ({ default: m.BibleBroadcastSearchPanel })),
);
const BibleBroadcastControl = React.lazy(() =>
  import('$bible/widgets/BroadcastControl').then(m => ({ default: m.BibleBroadcastControl })),
);
const BibleBroadcastCurrentSlidePreview = React.lazy(() =>
  import('$bible/widgets/BroadcastCurrentSlidePreview').then(m => ({ default: m.BibleBroadcastCurrentSlidePreview })),
);
const BibleBroadcastPreview = React.lazy(() =>
  import('$bible/widgets/BroadcastPreview').then(m => ({ default: m.BibleBroadcastPreview })),
);
const BibleBroadcastScreenConfigurations = React.lazy(() =>
  import('$bible/widgets/broadcast').then(m => ({ default: m.BibleBroadcastScreenConfigurations })),
);

export const bibleBroadcastTabConfigDict: BroadcastGridTabDict<BibleBroadcastTabId> = {
  [BibleBroadcastTabId.Preview]: {
    title: () => translateBase(it => it.preview),
    Comp: BibleBroadcastPreview,
  },
  [BibleBroadcastTabId.Slide]: {
    title: () => translateBase(it => it.slide),
    Comp: BibleBroadcastCurrentSlidePreview,
  },
  [BibleBroadcastTabId.Configs]: {
    title: () => translateBase(it => it.configs),
    Comp: BibleBroadcastScreenConfigurations,
  },
  [BibleBroadcastTabId.List]: {
    title: () => translateBase(it => it.lists),
    Comp: BibleBroadcastList,
  },
  [BibleBroadcastTabId.History]: {
    title: () => translateBase(it => it.history),
    Comp: BibleBroadcastHistoryArchive,
    htmlTitle: () => 'F1 F1',
  },
  [BibleBroadcastTabId.Plan]: {
    title: () => translateBase(it => it.plan),
    Comp: BibleBroadcastPlanArchive,
    htmlTitle: () => 'F1; Ctrl+Enter - добавить в План',
  },
  [BibleBroadcastTabId.Search]: {
    title: () => translateBase(it => it.search),
    Comp: BibleBroadcastSearchPanel,
  },
  [BibleBroadcastTabId.Control]: {
    title: () => translateBase(it => it.control),
    Comp: BibleBroadcastControl,
  },
  [BibleBroadcastTabId.Alert]: {
    title: () => translateBase(it => it.alert),
    Comp: AlertLineInput,
  },
};
