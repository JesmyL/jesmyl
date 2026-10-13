import { ElectronWorkDir } from '#features/ElectronWorkDir';
import { bibleBroadcastUpdateCurrentConfig } from '$bible/entities/broadcast';

export const BibleBroadcastWorkDir = () => {
  return (
    <ElectronWorkDir onApplyBg={boxId => bibleBroadcastUpdateCurrentConfig({ bgFileId: boxId, withBg: true })} />
  );
};
