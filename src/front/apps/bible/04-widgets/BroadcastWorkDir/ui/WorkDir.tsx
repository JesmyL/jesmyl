import { ElectronWorkDir } from '#features/ElectronWorkDir';
import { bibleBroadcastUpdateCurrentConfig, useBibleBroadcastScreenCurrentConfig } from '$bible/entities/broadcast';

export const BibleBroadcastWorkDir = () => {
  const currentConfig = useBibleBroadcastScreenCurrentConfig();

  return (
    <ElectronWorkDir
      bgFilePath={currentConfig?.bgFilePath}
      onApplyBg={filePath => bibleBroadcastUpdateCurrentConfig({ bgFilePath: filePath, withBg: !!filePath })}
    />
  );
};
