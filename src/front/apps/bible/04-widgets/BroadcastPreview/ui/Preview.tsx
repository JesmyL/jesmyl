import { BroadcastSlidePreview } from '#features/broadcast/SlidePreview';
import {
  bibleBroadcastUpdateCurrentConfig,
  useBibleBroadcastScreenCurrentConfig,
} from '$bible/entities/broadcast';

export const BibleBroadcastPreview = () => {
  const currentConfig = useBibleBroadcastScreenCurrentConfig();

  return (
    <BroadcastSlidePreview
      bgFilePath={currentConfig?.bgFilePath}
      onBgFilePathChange={filePath => bibleBroadcastUpdateCurrentConfig({ bgFilePath: filePath, withBg: !!filePath })}
      onBgFileIdChange={box => bibleBroadcastUpdateCurrentConfig({ bgFileId: box.id, withBg: true })}
    />
  );
};
