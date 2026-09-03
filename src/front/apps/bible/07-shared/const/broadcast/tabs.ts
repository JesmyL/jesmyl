import { translateBase } from '#basis/locale';
import { AlertLineInput } from '#features/broadcast/controls/alert-line/AlertLineInput';
import { BroadcastGridTabDict } from '#widgets/broadcast/model/TabConfig';
import { BibleBroadcastHistoryArchive } from '$bible/entities/broadcast-history';
import { BibleBroadcastList } from '$bible/entities/broadcast-list';
import { BibleBroadcastPlanArchive } from '$bible/entities/broadcast-plan';
import { BibleBroadcastSearchPanel } from '$bible/entities/broadcast-search';
import { BibleBroadcastTabId } from '$bible/shared/model/broadcast';
import { BibleBroadcastScreenConfigurations } from '$bible/widgets/broadcast';
import { BibleBroadcastControl } from '$bible/widgets/BroadcastControl';
import { BibleBroadcastCurrentSlidePreview } from '$bible/widgets/BroadcastCurrentSlidePreview';
import { BibleBroadcastPreview } from '$bible/widgets/BroadcastPreview';

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
    htmlTitle: () => 'F1',
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
