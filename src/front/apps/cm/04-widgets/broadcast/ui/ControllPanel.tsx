import { ScreenBroadcastControlPanel } from '#features/broadcast/controls/ControllPanel';
import { useCmBroadcastScreenComTextNavigations } from '$cm/features/broadcast';

export const CmBroadcastControlPanel = () => {
  const { nextSlide, prevSlide } = useCmBroadcastScreenComTextNavigations();

  return (
    <ScreenBroadcastControlPanel
      onNext={nextSlide}
      onPrev={prevSlide}
    />
  );
};
