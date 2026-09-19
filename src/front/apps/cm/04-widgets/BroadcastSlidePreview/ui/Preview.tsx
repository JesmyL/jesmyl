import { BroadcastSlidePreview } from '#features/broadcast/SlidePreview';
import { useCmBroadcastUpdateCurrentConfig } from '$cm/shared/lib/broadcast';

export const CmBroadcastSlidePreview = () => {
  const updateCmConfig = useCmBroadcastUpdateCurrentConfig();

  return <BroadcastSlidePreview onBgFileIdChange={box => updateCmConfig({ bgFileId: box.id, withBg: true })} />;
};
