import { CurrentForceViweAppContext } from '#features/broadcast/Broadcast.contexts';
import { isTouchDevice } from '#shared/lib/device-differences';
import { CmScheduleWidgetBroadcastLiveCm } from '$cm/ext';
import { CmBroadcastSlidesContext } from '$cm/features/broadcast';
import { CmBroadcastFullscreen } from './Fullscreen';

export const CmBroadcast = () => {
  return (
    <>
      <CurrentForceViweAppContext value="cm">
        <CmBroadcastSlidesContext configi={0}>
          {isTouchDevice ? <CmBroadcastFullscreen /> : <CmScheduleWidgetBroadcastLiveCm />}
        </CmBroadcastSlidesContext>
      </CurrentForceViweAppContext>
    </>
  );
};
