import { translateBase } from '#basis/locale';
import { BroadcastGridTabDict } from '#widgets/broadcast/model/TabConfig';
import { PresentationsBroadcastTabId } from '$presentations/shared/model/broadcast';
import { PresentationsBroadcastPreview } from '$presentations/widgets/BroadcastPreview';
import React, { memo } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const presentationsBroadcastTabConfigDict: BroadcastGridTabDict<PresentationsBroadcastTabId> = {
  [PresentationsBroadcastTabId.WorkDir]: {
    title: () => translateBase(BaseLocaleKey.Folder),
    Comp: React.lazy(() =>
      import('$presentations/widgets/BroadcastWorkDir').then(m => ({ default: m.PresentationsBroadcastWorkDir })),
    ),
  },
  [PresentationsBroadcastTabId.Slides]: {
    title: () => translateBase(BaseLocaleKey.Slides),
    Comp: React.lazy(() =>
      import('$presentations/widgets/BroadcastSlides').then(m => ({ default: m.PresentationsBroadcastSlides })),
    ),
  },
  [PresentationsBroadcastTabId.Preview]: {
    title: () => translateBase(BaseLocaleKey.Preview),
    // The preview is rendered synchronously: the slides are already in atoms, so a lazy chunk
    // would only add a Suspense skeleton flash ("appearing") before the same slide is shown.
    Comp: memo(PresentationsBroadcastPreview),
  },
};
