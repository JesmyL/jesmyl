import { ScreenBroadcastControlPanel } from '#features/broadcast/controls/ControllPanel';
import { useCmBroadcastSlidesContext } from '$cm/features/broadcast';

export const CmBroadcastControlPanel = () => {
  const { toNextSlide, toPrevSlide } = useCmBroadcastSlidesContext();

  return (
    <ScreenBroadcastControlPanel
      onNext={toNextSlide}
      onPrev={toPrevSlide}
    />
  );
};
