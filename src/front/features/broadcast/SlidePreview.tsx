import { BroadcastScreen } from '#features/broadcast/BroadcastScreen';
import { useScreenBroadcastCurrentConfig } from '#features/broadcast/hooks/configs';
import { StyledBroadcastScreenProportioned } from '#shared/style/StyledBroadcastScreenProportioned';
import { ScreensConfigurator } from '#shared/ui/configurators/Screens';
import { MyFileBox, MyFilesUploader, MyFileType } from 'x/my-files';

interface Props {
  isPreview?: boolean;
  onBgFileIdChange: (fileBox: MyFileBox) => void;
}

export const BroadcastSlidePreview = ({ isPreview = true, onBgFileIdChange }: Props) => {
  const currentConfig = useScreenBroadcastCurrentConfig();

  return (
    <>
      <MyFilesUploader
        className="pointer"
        onChange={boxes => {
          const box = boxes.find(b => [MyFileType.Image, MyFileType.Video].includes(b.type));
          if (box) onBgFileIdChange(box);
        }}
      >
        {!currentConfig ? (
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
        )}
      </MyFilesUploader>
    </>
  );
};
