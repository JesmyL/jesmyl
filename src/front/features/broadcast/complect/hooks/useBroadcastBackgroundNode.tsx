import { takeMediaMimeByFileName } from '#features/ElectronWorkDir/lib/electronWorkDir';
import { useWorkDirFileSrc } from '#features/ElectronWorkDir/lib/useWorkDirFileSrc';
import { isElectronApp } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { BackgroundMediaNode } from '#shared/ui/BackgroundMediaNode';
import { MyFileId, useMyFileNode } from 'x/my-files';

type BroadcastBackgroundProps = {
  bgFileId?: MyFileId | nil;
  bgFilePath?: string | nil;
  withBg: boolean | und;
};

/** Web build keeps the MyFiles IDB source. */
const useMyFileBackgroundNode = ({ bgFileId, withBg }: BroadcastBackgroundProps) =>
  useMyFileNode(withBg ? bgFileId : undefined);

/** Electron resolves the background only from the WorkDir file path — never from MyFiles IDB. */
const useWorkDirBackgroundNode = ({ bgFilePath, withBg }: BroadcastBackgroundProps) => {
  const src = useWorkDirFileSrc(withBg && bgFilePath ? bgFilePath : '');

  if (!src || !bgFilePath) return null;

  return (
    <BackgroundMediaNode
      src={src}
      isVideo={takeMediaMimeByFileName(bgFilePath).startsWith('video/')}
    />
  );
};

const useBackgroundNodeByEnv = isElectronApp ? useWorkDirBackgroundNode : useMyFileBackgroundNode;

export const useBroadcastBackgroundNode = (props: BroadcastBackgroundProps) => useBackgroundNodeByEnv(props);
