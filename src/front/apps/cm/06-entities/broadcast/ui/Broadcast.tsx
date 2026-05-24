import { CurrentForceViweAppContext } from '#features/broadcast/Broadcast.contexts';
import { isTouchDevice } from '#shared/lib/device-differences';
import { CmBroadcastSlidesContext } from '$cm/features/broadcast';
import { CmBroadcastControlled } from '$cm/widgets/broadcast';
import { CmBroadcastFullscreen } from './Fullscreen';

export const CmBroadcast = () => {
  return (
    <>
      <CurrentForceViweAppContext value="cm">
        <CmBroadcastSlidesContext configi={0}>
          {isTouchDevice ? <CmBroadcastFullscreen /> : <CmBroadcastControlled />}
        </CmBroadcastSlidesContext>
      </CurrentForceViweAppContext>
    </>
  );
};
