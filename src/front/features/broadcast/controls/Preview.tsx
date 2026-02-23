import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { Atom, atom } from 'atomaric';
import styled, { css } from 'styled-components';
import { BroadcastScreen } from '../BroadcastScreen';
import { useScreenBroadcastCurrentConfig } from '../hooks/configs';

interface Props {
  isPreview?: boolean;
}

let isSettingsOpenAtom: Atom<boolean>;

export const BroadcastSlidePreview = ({ isPreview = true }: Props) => {
  isSettingsOpenAtom ??= atom(false);

  const currentConfig = useScreenBroadcastCurrentConfig();

  return (
    <div className="pointer relative inline-block w-(--size) min-w-(--min-size) max-w-(--max-size) h-(--size) min-h-(--min-size) max-h-(--max-size) overflow-hidden text-x3 text-[14px] align-middle select-none whitespace-pre rounded-[20px]">
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
