import { CurrentForceViweAppContext } from '#features/broadcast/Broadcast.contexts';
import { isTouchDevice } from '#shared/lib/device-differences';
import { CmBroadcastSlidesContext } from '$cm/features/broadcast';
import { useCmBroadcastScreenConfig } from '$cm/shared/lib/broadcast';
import React from 'react';
import { CmBroadcastFullscreen } from './Fullscreen';

const CmScheduleWidgetBroadcastLiveCm = React.lazy(() =>
  import('$cm/widgets/schedule-widget-broadcast').then(m => ({ default: m.CmScheduleWidgetBroadcastLiveCm })),
);

export const CmBroadcast = () => {
  const config = useCmBroadcastScreenConfig(0);

  return (
    <>
      <CurrentForceViweAppContext value="cm">
        <CmBroadcastSlidesContext textCase={config?.case}>
          {isTouchDevice ? <CmBroadcastFullscreen /> : <CmScheduleWidgetBroadcastLiveCm />}
        </CmBroadcastSlidesContext>
      </CurrentForceViweAppContext>
    </>
  );
};
