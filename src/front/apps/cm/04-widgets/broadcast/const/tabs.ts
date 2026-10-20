import { translateBase } from '#basis/locale';
import { BroadcastGridTabDict } from '#widgets/broadcast/model/TabConfig';
import { CmBroadcastTabId } from '$cm/shared/model/broadcast';
import React from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const cmBroadcastTabConfigDict: BroadcastGridTabDict<CmBroadcastTabId> = {
  [CmBroadcastTabId.Preview]: {
    title: () => translateBase(BaseLocaleKey.Preview),
    Comp: React.lazy(() =>
      import('$cm/widgets/BroadcastSlidePreview').then(m => ({ default: m.CmBroadcastSlidePreview })),
    ),
  },
  [CmBroadcastTabId.Alert]: {
    title: () => translateBase(BaseLocaleKey.Alert),
    Comp: React.lazy(() =>
      import('#features/broadcast/controls/alert-line/AlertLineInput').then(m => ({ default: m.AlertLineInput })),
    ),
  },
  [CmBroadcastTabId.List]: {
    title: () => translateBase(BaseLocaleKey.Lists),
    Comp: React.lazy(() =>
      import('$cm/widgets/BroadcastGridTabList').then(m => ({ default: m.CmBroadcastGridTabList })),
    ),
  },
  [CmBroadcastTabId.Slides]: {
    title: () => translateBase(BaseLocaleKey.Slides),
    Comp: React.lazy(() =>
      import('$cm/widgets/BroadcastSlideControl').then(m => ({ default: m.CmBroadcastSlideControl })),
    ),
  },
  [CmBroadcastTabId.Configs]: {
    title: () => translateBase(BaseLocaleKey.Configs),
    Comp: React.lazy(() =>
      import('../ui/ScreenConfigurations').then(m => ({ default: m.CmBroadcastScreenConfigurations })),
    ),
  },
  [CmBroadcastTabId.Dropdowns]: {
    title: () => translateBase(BaseLocaleKey.Settings),
    Comp: React.lazy(() => import('$cm/widgets/BroadcastDropdowns').then(m => ({ default: m.CmBroadcastDropdowns }))),
  },
  [CmBroadcastTabId.WorkDir]: {
    title: () => translateBase(BaseLocaleKey.Folder),
    Comp: React.lazy(() => import('$cm/widgets/BroadcastWorkDir').then(m => ({ default: m.CmBroadcastWorkDir }))),
  },
};
