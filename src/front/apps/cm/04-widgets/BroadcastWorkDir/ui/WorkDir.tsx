import { ElectronWorkDir } from '#features/ElectronWorkDir';
import { useCmBroadcastUpdateCurrentConfig } from '$cm/shared/lib/broadcast';

export const CmBroadcastWorkDir = () => {
  const updateCmConfig = useCmBroadcastUpdateCurrentConfig();

  return <ElectronWorkDir onApplyBg={boxId => updateCmConfig({ bgFileId: boxId, withBg: true })} />;
};
