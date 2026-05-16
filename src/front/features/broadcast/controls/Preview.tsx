import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Atom, atom } from 'atomaric';
import { MyFileBox, MyFilesUploader } from 'x/my-files';
import { BroadcastScreen } from '../BroadcastScreen';
import { useScreenBroadcastCurrentConfig } from '../hooks/configs';

interface Props {
  isPreview?: boolean;
  onBgFileIdChange: (fileBoxes: MyFileBox[]) => void;
}

let isSettingsOpenAtom: Atom<boolean>;

export const BroadcastSlidePreview = ({ isPreview = true, onBgFileIdChange }: Props) => {
  isSettingsOpenAtom ??= atom(false);

  const currentConfig = useScreenBroadcastCurrentConfig();

  return (
    <>
      <MyFilesUploader
        onChange={onBgFileIdChange}
        className="pointer relative inline-block w-(--size) min-w-(--min-size) max-w-(--max-size) h-(--size) min-h-(--min-size) max-h-(--max-size) overflow-hidden text-x3 text-[14px] align-middle select-none whitespace-pre rounded-[20px]"
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

            <TheIconButton
              className="absolute top-[5px] right-[5px] z-101"
              icon="PencilEdit02"
              onClick={isSettingsOpenAtom.do.toggle}
            />
          </>
        )}
      </MyFilesUploader>

      <FullContent openAtom={isSettingsOpenAtom}>
        <div className="flex center mt-5">
          <StyledFullContainer className="flex center bg-x3 strong-size">
            {currentConfig && (
              <ScreenWithBackground $proportion={currentConfig.proportion}>
                <BroadcastScreen
                  isTech
                  isPreview={isPreview}
                />
              </ScreenWithBackground>
            )}
          </StyledFullContainer>
        </div>
      </FullContent>
    </>
  );
};

const StyledFullContainer = styled.div`
  --strong-size: 94.5vmin;
`;

const ScreenWithBackground = styled.div<{ $proportion: number }>`
  ${props => css`
    width: ${props.$proportion < 1 ? `calc(100% * ${props.$proportion})` : '100%'};
    height: ${props.$proportion < 1 ? '100%' : `calc(100% / ${props.$proportion})`};
  `}
`;
