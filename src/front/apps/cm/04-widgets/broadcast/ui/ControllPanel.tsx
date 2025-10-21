import { ScreenBroadcastControlPanel } from '#features/broadcast/controls/ControllPanel';
import { useCmBroadcastScreenComTextNavigations } from '$cm/features/broadcast';

export const CmBroadcastControlPanel = () => {
  const { nextText, prevText } = useCmBroadcastScreenComTextNavigations();

  return (
    <ScreenBroadcastControlPanel
      onNext={nextText}
      onPrev={prevText}
    />
  );
};
