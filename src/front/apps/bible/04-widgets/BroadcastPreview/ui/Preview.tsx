import { BroadcastSlidePreview } from '#features/broadcast/SlidePreview';
import { bibleBroadcastUpdateCurrentConfig } from '$bible/entities/broadcast';

export const BibleBroadcastPreview = () => {
  return (
    <BroadcastSlidePreview
      onBgFileIdChange={box => bibleBroadcastUpdateCurrentConfig({ bgFileId: box.id, withBg: true })}
    />
  );
};
