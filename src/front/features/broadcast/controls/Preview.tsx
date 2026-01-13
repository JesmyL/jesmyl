import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { atom } from 'atomaric';
import styled, { css } from 'styled-components';
import { BroadcastScreen } from '../BroadcastScreen';
import { useScreenBroadcastCurrentConfig } from '../hooks/configs';

interface Props {
  isPreview?: boolean;
}

const isSettingsOpenAtom = atom(false);

export const BroadcastSlidePreview = ({ isPreview = true }: Props) => {
  const currentConfig = useScreenBroadcastCurrentConfig();

  return (
    <div className="pointer relative inline-block w-[var(--size)] min-w-[var(--min-size)] max-w-[var(--max-size)] h-[var(--size)] min-h-[var(--min-size)] max-h-[var(--max-size)] overflow-hidden text-x3 text-[14px] align-middle select-none whitespace-pre rounded-[20px]">
      {currentConfig === undefined ? (
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

      <FullContent openAtom={isSettingsOpenAtom}>
        <div className="flex center mt-5">
          <FullContainer className="flex center bg-x3">
            {currentConfig && (
              <ScreenWithBackground $proportion={currentConfig.proportion}>
                <BroadcastScreen
                  isTech
                  isPreview={isPreview}
                />
              </ScreenWithBackground>
            )}
          </FullContainer>
        </div>
      </FullContent>
    </div>
  );
};

const size = '94.5vmin';

const FullContainer = styled.div`
  height: ${size};
  min-height: ${size};
  max-height: ${size};

  width: ${size};
  min-width: ${size};
  max-width: ${size};
`;

const ScreenWithBackground = styled.div<{ $proportion: number }>`
  ${props => {
    return css`
      width: ${props.$proportion < 1 ? `calc(100% * ${props.$proportion})` : '100%'};
      height: ${props.$proportion < 1 ? '100%' : `calc(100% / ${props.$proportion})`};
    `;
  }}
`;
