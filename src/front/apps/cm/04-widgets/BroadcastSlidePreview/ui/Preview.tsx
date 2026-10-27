import { BroadcastSlidePreview } from '#features/broadcast/SlidePreview';
import { useCmBroadcastCurrentScreenConfig, useCmBroadcastUpdateCurrentConfig } from '$cm/shared/lib/broadcast';

export const CmBroadcastSlidePreview = () => {
  const updateCmConfig = useCmBroadcastUpdateCurrentConfig();
  const currentConfig = useCmBroadcastCurrentScreenConfig();

  return (
    <BroadcastSlidePreview
      bgFilePath={currentConfig?.bgFilePath}
      onBgFilePathChange={filePath => updateCmConfig({ bgFilePath: filePath, withBg: !!filePath })}
      onBgFileIdChange={box => updateCmConfig({ bgFileId: box.id, withBg: true })}
    />
  );
};
