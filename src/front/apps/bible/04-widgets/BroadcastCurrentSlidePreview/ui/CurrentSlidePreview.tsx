import { BroadcastSlidePreview } from '#features/broadcast/SlidePreview';
import { useBibleBroadcastUpdateCurrentConfig } from '$bible/entities/broadcast';

export const BibleBroadcastCurrentSlidePreview = () => {
  const updateConfig = useBibleBroadcastUpdateCurrentConfig();

  return (
    <BroadcastSlidePreview
      isPreview={false}
      onBgFileIdChange={box => updateConfig({ bgFileId: box.id, withBg: true })}
    />
  );
};
