import { translateBase } from '#basis/locale';
import { AlertLineInput } from '#features/broadcast/controls/alert-line/AlertLineInput';
import { BroadcastGridTabDict } from '#widgets/broadcast/model/TabConfig';
import { CmBroadcastTabId } from '$cm/shared/model/broadcast';
import { CmBroadcastDropdowns } from '$cm/widgets/BroadcastDropdowns';
import { CmBroadcastGridTabList } from '$cm/widgets/BroadcastGridTabList';
import { CmBroadcastSlideControl } from '$cm/widgets/BroadcastSlideControl';
import { CmBroadcastSlidePreview } from '$cm/widgets/BroadcastSlidePreview';
import { CmBroadcastScreenConfigurations } from '../ui/ScreenConfigurations';

export const cmBroadcastTabConfigDict: BroadcastGridTabDict<CmBroadcastTabId> = {
  [CmBroadcastTabId.Preview]: {
    title: () => translateBase(it => it.preview),
    Comp: CmBroadcastSlidePreview,
  },
  [CmBroadcastTabId.Alert]: {
    title: () => translateBase(it => it.alert),
    Comp: AlertLineInput,
  },
  [CmBroadcastTabId.List]: {
    title: () => translateBase(it => it.lists),
    Comp: CmBroadcastGridTabList,
  },
  [CmBroadcastTabId.Slides]: {
    title: () => translateBase(it => it.slides),
    Comp: CmBroadcastSlideControl,
  },
  [CmBroadcastTabId.Configs]: {
    title: () => translateBase(it => it.configs),
    Comp: CmBroadcastScreenConfigurations,
  },
  [CmBroadcastTabId.Dropdowns]: {
    title: () => translateBase(it => it.settings),
    Comp: CmBroadcastDropdowns,
  },
};
