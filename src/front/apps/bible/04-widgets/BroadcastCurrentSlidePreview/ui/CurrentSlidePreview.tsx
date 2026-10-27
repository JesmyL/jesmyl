import { BroadcastSlidePreview } from '#features/broadcast/SlidePreview';
import {
  bibleBroadcastUpdateCurrentConfig,
  useBibleBroadcastScreenCurrentConfig,
} from '$bible/entities/broadcast';

export const BibleBroadcastCurrentSlidePreview = () => {
  const currentConfig = useBibleBroadcastScreenCurrentConfig();

  return (
    <BroadcastSlidePreview
      isPreview={false}
      bgFilePath={currentConfig?.bgFilePath}
      onBgFilePathChange={filePath => bibleBroadcastUpdateCurrentConfig({ bgFilePath: filePath, withBg: !!filePath })}
      onBgFileIdChange={box => bibleBroadcastUpdateCurrentConfig({ bgFileId: box.id, withBg: true })}
    />
  );
};
