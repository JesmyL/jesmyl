import { ElectronWorkDir } from '#features/ElectronWorkDir';
import { useCmBroadcastCurrentScreenConfig, useCmBroadcastUpdateCurrentConfig } from '$cm/shared/lib/broadcast';

export const CmBroadcastWorkDir = () => {
  const updateCmConfig = useCmBroadcastUpdateCurrentConfig();
  const currentConfig = useCmBroadcastCurrentScreenConfig();

  return (
    <ElectronWorkDir
      bgFilePath={currentConfig?.bgFilePath}
      onApplyBg={filePath => updateCmConfig({ bgFilePath: filePath, withBg: !!filePath })}
    />
  );
};
