import { BroadcastScreen } from '#features/broadcast/BroadcastScreen';
import { useScreenBroadcastCurrentConfig } from '#features/broadcast/hooks/configs';
import { ElectronWorkDirBackgroundSelector } from '#features/ElectronWorkDir/ui/BackgroundSelector';
import { isElectronApp } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { StyledBroadcastScreenProportioned } from '#shared/style/StyledBroadcastScreenProportioned';
import { ScreensConfigurator } from '#shared/ui/configurators/Screens';
import { MyFileBox, MyFilesUploader, MyFileType } from 'x/my-files';

interface Props {
  isPreview?: boolean;
  bgFilePath?: string;
  onBgFileIdChange: (fileBox: MyFileBox) => void;
  onBgFilePathChange?: (filePath: string | und) => void;
}

export const BroadcastSlidePreview = ({
  isPreview = true,
  bgFilePath,
  onBgFileIdChange,
  onBgFilePathChange,
}: Props) => {
  const currentConfig = useScreenBroadcastCurrentConfig();

  const content = !currentConfig ? (
    <BroadcastScreen
      win={window}
      isPreview={isPreview}
    />
  ) : (
    <>
      <div className="flex center full-size bg-x2">
        <StyledBroadcastScreenProportioned $proportion={currentConfig.proportion}>
          <BroadcastScreen
            win={window}
            isPreview={isPreview}
          />
        </StyledBroadcastScreenProportioned>
      </div>

      <div className="absolute top-[5px] right-[5px] z-20">
        <ScreensConfigurator isButtonOnly />
      </div>
    </>
  );

  // The Electron build resolves backgrounds from the WorkDir — never through the MyFiles IDB uploader.
  if (isElectronApp)
    return (
      <div className="full-size relative">
        {content}
        {!onBgFilePathChange || (
          <div className="absolute top-[5px] left-[5px] z-20">
            <ElectronWorkDirBackgroundSelector
              bgFilePath={bgFilePath}
              onSelect={onBgFilePathChange}
            />
          </div>
        )}
      </div>
    );

  return (
    <MyFilesUploader
      className="pointer"
      onChange={boxes => {
        const box = boxes.find(b => [MyFileType.Image, MyFileType.Video].includes(b.type));
        if (box) onBgFileIdChange(box);
      }}
    >
      {content}
    </MyFilesUploader>
  );
};
