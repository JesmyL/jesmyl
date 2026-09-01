import { BroadcastScreen } from '#features/broadcast/BroadcastScreen';
import { useScreenBroadcastCurrentConfig } from '#features/broadcast/hooks/configs';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { WithAtom } from '#shared/ui/WithAtom';
import styled from '@emotion/styled';
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
              <ScreenWithBackground $proportion={currentConfig.proportion}>
                <BroadcastScreen
                  win={window}
                  isPreview={isPreview}
                />
              </ScreenWithBackground>
            </div>

            <WithAtom init={false}>
              {isSettingsOpenAtom => (
                <>
                  <TheIconButton
                    className="absolute top-[5px] right-[5px] z-20"
                    icon="PencilEdit02"
                    onClick={isSettingsOpenAtom.do.toggle}
                  />

                  <FullContent openAtom={isSettingsOpenAtom}>
                    {isOpen =>
                      isOpen &&
                      currentConfig && (
                        <div className="flex center mt-5">
                          <StyledFullContainer className="flex center bg-x3 strong-size">
                            <ScreenWithBackground $proportion={currentConfig.proportion}>
                              <BroadcastScreen
                                isTech
                                isPreview={isPreview}
                              />
                            </ScreenWithBackground>
                          </StyledFullContainer>
                        </div>
                      )
                    }
                  </FullContent>
                </>
              )}
            </WithAtom>
          </>
        )}
      </MyFilesUploader>
    </>
  );
};

const StyledFullContainer = styled.div`
  --strong-size: 94.5vmin;
`;

const ScreenWithBackground = styled.div<{ $proportion: number }>`
  --prop: ${props => props.$proportion};
  width: min(100cqw, calc(100cqh * var(--prop)));
  height: min(100cqh, calc(100cqw / var(--prop)));
`;
