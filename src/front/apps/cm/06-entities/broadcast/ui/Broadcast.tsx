import { CurrentForceViweAppContext } from '#features/broadcast/Broadcast.contexts';
import { isTouchDevice } from '#shared/lib/device-differences';
import { CmBroadcastControlled } from '$cm/widgets/broadcast';
import { CmBroadcastFullscreen } from './Fullscreen';

export const CmBroadcast = () => {
  return (
    <>
      <CurrentForceViweAppContext value="cm">
        {isTouchDevice ? <CmBroadcastFullscreen /> : <CmBroadcastControlled />}
      </CurrentForceViweAppContext>
    </>
  );
};
