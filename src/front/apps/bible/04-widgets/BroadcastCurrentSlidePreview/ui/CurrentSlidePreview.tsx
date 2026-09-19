import { BroadcastSlidePreview } from '#features/broadcast/SlidePreview';
import { bibleBroadcastUpdateCurrentConfig } from '$bible/entities/broadcast';

export const BibleBroadcastCurrentSlidePreview = () => {
  return (
    <BroadcastSlidePreview
      isPreview={false}
      onBgFileIdChange={box => bibleBroadcastUpdateCurrentConfig({ bgFileId: box.id, withBg: true })}
    />
  );
};
