import { useState } from 'react';
import styled, { css } from 'styled-components';
import { FullContent } from '../../../../../complect/fullscreen-content/FullContent';
import IconButton from '../../../../../complect/the-icon/IconButton';
import { TranslationScreen } from '../TranslationScreen';
import { useScreenTranslationCurrentConfig } from '../hooks/configs';

interface Props {
  isPreview?: boolean;
}

export const TranslationSlidePreview = ({ isPreview = true }: Props) => {
  const currentConfig = useScreenTranslationCurrentConfig();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <Wrapper className="pointer">
      {isSettingsOpen && currentConfig && (
        <FullContent onClose={setIsSettingsOpen}>
          <div className="flex center margin-big-gap-t">
            <FullContainer className="flex center bgcolor--3">
              <ScreenWithBackground $proportion={currentConfig.proportion}>
                <TranslationScreen
                  isTech
                  isPreview={isPreview}
                />
              </ScreenWithBackground>
            </FullContainer>
          </div>
        </FullContent>
      )}
      {currentConfig === undefined ? (
        <TranslationScreen
          win={window}
          isPreview={isPreview}
        />
      ) : (
        <>
          <div className="flex center full-size bgcolor--2">
            <ScreenWithBackground $proportion={currentConfig.proportion}>
              <TranslationScreen
                win={window}
                isPreview={isPreview}
              />
            </ScreenWithBackground>
          </div>
          <FullButton
            icon="PencilEdit02"
            onClick={() => setIsSettingsOpen(true)}
          />
        </>
      )}
    </Wrapper>
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

const FullButton = styled(IconButton)`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 101;
`;

const Wrapper = styled.div`
  --radius: 20px;

  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: var(--size);
  min-width: var(--min-size);
  max-width: var(--max-size);
  height: var(--size);
  min-height: var(--min-size);
  max-height: var(--max-size);

  overflow: hidden;
  color: var(--color-far);
  font-size: 14px;
  user-select: none;
  white-space: pre;

  border-radius: var(--radius);
`;

const ScreenWithBackground = styled.div<{ $proportion: number }>`
  ${props => {
    return css`
      width: ${props.$proportion < 1 ? `calc(100% * ${props.$proportion})` : '100%'};
      height: ${props.$proportion < 1 ? '100%' : `calc(100% / ${props.$proportion})`};
    `;
  }}
`;
