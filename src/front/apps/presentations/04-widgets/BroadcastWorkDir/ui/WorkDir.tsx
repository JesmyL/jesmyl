import { PresentationSlideCanvas } from '#features/broadcast/ui/PresentationScreen';
import { ElectronWorkDir } from '#features/ElectronWorkDir';
import { Button } from '#shared/components';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { openPresentationFile } from '$presentations/shared/lib/presentation-broadcast';
import { usePresentationPreview } from '$presentations/shared/lib/presentation-preview';
import { presentationsCurrentFilePathAtom } from '$presentations/shared/state/broadcast.atoms';
import { useAtomValue } from 'atomaric';
import { ElectronWorkDirFile } from 'shared/api/tsjrpc.electtron/basic';
import { toast } from 'sonner';

const PptxPreview = ({ file }: { file: ElectronWorkDirFile }) => {
  const slide = usePresentationPreview(file.path, file.size);

  if (!slide)
    return (
      <Button
        asSpan
        icon="File02"
        withoutAnimation
        title={file.name}
      />
    );

  return <PresentationSlideCanvas slide={slide} />;
};

export const PresentationsBroadcastWorkDir = () => {
  const currentFilePath = useAtomValue(presentationsCurrentFilePathAtom);

  return (
    <ElectronWorkDir
      bgFilePath={currentFilePath}
      onPptxOpen={filePath => {
        openPresentationFile(filePath).catch(error => toast(`${error}`, makeToastKOMoodConfig()));
      }}
      PptxPreview={PptxPreview}
    />
  );
};
