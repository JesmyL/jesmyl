import { BroadcastSlidePreview } from '#features/broadcast/SlidePreview';
import { useBibleBroadcastUpdateCurrentConfig } from '$bible/entities/broadcast';

export const BibleBroadcastPreview = () => {
  const updateConfig = useBibleBroadcastUpdateCurrentConfig();

  return <BroadcastSlidePreview onBgFileIdChange={box => updateConfig({ bgFileId: box.id, withBg: true })} />;
};
