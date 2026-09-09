import { translateBase } from '#basis/locale';
import { BroadcastGridTabDict } from '#widgets/broadcast/model/TabConfig';
import { CmBroadcastTabId } from '$cm/shared/model/broadcast';
import React from 'react';

export const cmBroadcastTabConfigDict: BroadcastGridTabDict<CmBroadcastTabId> = {
  [CmBroadcastTabId.Preview]: {
    title: () => translateBase(it => it.preview),
    Comp: React.lazy(() =>
      import('$cm/widgets/BroadcastSlidePreview').then(m => ({ default: m.CmBroadcastSlidePreview })),
    ),
  },
  [CmBroadcastTabId.Alert]: {
    title: () => translateBase(it => it.alert),
    Comp: React.lazy(() =>
      import('#features/broadcast/controls/alert-line/AlertLineInput').then(m => ({ default: m.AlertLineInput })),
    ),
  },
  [CmBroadcastTabId.List]: {
    title: () => translateBase(it => it.lists),
    Comp: React.lazy(() =>
      import('$cm/widgets/BroadcastGridTabList').then(m => ({ default: m.CmBroadcastGridTabList })),
    ),
  },
  [CmBroadcastTabId.Slides]: {
    title: () => translateBase(it => it.slides),
    Comp: React.lazy(() =>
      import('$cm/widgets/BroadcastSlideControl').then(m => ({ default: m.CmBroadcastSlideControl })),
    ),
  },
  [CmBroadcastTabId.Configs]: {
    title: () => translateBase(it => it.configs),
    Comp: React.lazy(() =>
      import('../ui/ScreenConfigurations').then(m => ({ default: m.CmBroadcastScreenConfigurations })),
    ),
  },
  [CmBroadcastTabId.Dropdowns]: {
    title: () => translateBase(it => it.settings),
    Comp: React.lazy(() => import('$cm/widgets/BroadcastDropdowns').then(m => ({ default: m.CmBroadcastDropdowns }))),
  },
};
