import { CurrentForceViweAppContext } from '#features/broadcast/Broadcast.contexts';
import { isTouchDevice } from '#shared/lib/device-differences';
import { CmScheduleWidgetBroadcastLiveCm } from '$cm/ext';
import { CmBroadcastSlidesContext } from '$cm/features/broadcast';
import { useCmBroadcastScreenConfig } from '$cm/shared/lib/broadcast';
import { CmBroadcastFullscreen } from './Fullscreen';

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
