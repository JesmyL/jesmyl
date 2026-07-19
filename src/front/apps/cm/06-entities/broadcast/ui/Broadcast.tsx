import { CurrentForceViweAppContext } from '#features/broadcast/Broadcast.contexts';
import { isTouchDevice } from '#shared/lib/device-differences';
import { useCmComCurrent } from '$cm/entities/com';
import { CmScheduleWidgetBroadcastLiveCm } from '$cm/ext';
import { CmBroadcastSlidesContext } from '$cm/features/broadcast';
import { useCmBroadcastScreenConfig } from '$cm/widgets/broadcast';
import { CmBroadcastFullscreen } from './Fullscreen';

export const CmBroadcast = () => {
  const config = useCmBroadcastScreenConfig(0);
  const com = useCmComCurrent();

  return (
    com && (
      <>
        <CurrentForceViweAppContext value="cm">
          <CmBroadcastSlidesContext
            textCase={config?.case}
            com={com}
          >
            {isTouchDevice ? <CmBroadcastFullscreen /> : <CmScheduleWidgetBroadcastLiveCm />}
          </CmBroadcastSlidesContext>
        </CurrentForceViweAppContext>
      </>
    )
  );
};
