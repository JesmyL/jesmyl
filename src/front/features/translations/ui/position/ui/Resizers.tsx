import styled, { css } from 'styled-components';
import { FixedResizerLines, ScreenTranslationPositionConfig } from '../../../model/Position.model';
import { usePositionConfiguratorResizerBorderMaker } from '../hooks/border-maker';
import { ShowHalfFixersKeyActiveMode } from '../model';
import { ScreenResizerResizeOnly } from '../Position';
import { PositionConfiguratorsResizersHalfFixer } from './HalfFixer';

interface Props {
  setOnMove: (callback: ((event: MouseEvent) => void) | null) => void;
  updateConfig: (config: Partial<ScreenTranslationPositionConfig>) => void;
  rectRef: React.RefObject<HTMLDivElement>;
  wrapperRef: React.RefObject<HTMLDivElement>;
  resizeOnly?: ScreenResizerResizeOnly;
  config: ScreenTranslationPositionConfig;
  fixedResizerLines: FixedResizerLines | null;
  showHalfFixersKeyActiveMode: ShowHalfFixersKeyActiveMode;
}

export const PositionConfiguratorsResizers = ({
  setOnMove,
  updateConfig,
  rectRef,
  wrapperRef,
  resizeOnly,
  config,
  fixedResizerLines,
  showHalfFixersKeyActiveMode,
}: Props) => {
  let top = true;
  let right = true;
  let bottom = true;
  let left = true;

  const putElement = usePositionConfiguratorResizerBorderMaker(
    rectRef,
    wrapperRef,
    setOnMove,
    updateConfig,
    config,
    fixedResizerLines,
  );

  if (resizeOnly !== undefined) {
    top = resizeOnly.includes('top');
    right = resizeOnly.includes('right');
    bottom = resizeOnly.includes('bottom');
    left = resizeOnly.includes('left');
  }

  return (
    <Resizers
      $fixedResizerLines={fixedResizerLines}
      $config={config}
      $showHalfFixersKeyActiveMode={showHalfFixersKeyActiveMode}
    >
      {(showHalfFixersKeyActiveMode === 'ctrl' ||
        (showHalfFixersKeyActiveMode === 'shift' && fixedResizerLines?.type === 'vert') ||
        (fixedResizerLines &&
          fixedResizerLines.type === 'vert' &&
          fixedResizerLines.value === config.top + config.height / 2)) && (
        <PositionConfiguratorsResizersHalfFixer
          prop="vert"
          config={config}
          fixedResizerLines={fixedResizerLines}
          updateConfig={updateConfig}
        />
      )}
      {(showHalfFixersKeyActiveMode === 'ctrl' ||
        (showHalfFixersKeyActiveMode === 'shift' && fixedResizerLines?.type === 'horz') ||
        (fixedResizerLines &&
          fixedResizerLines.type === 'horz' &&
          fixedResizerLines.value === config.left + config.width / 2)) && (
        <PositionConfiguratorsResizersHalfFixer
          prop="horz"
          config={config}
          fixedResizerLines={fixedResizerLines}
          updateConfig={updateConfig}
        />
      )}

      {top && putElement('top', null)}
      {right && putElement(null, 'right')}
      {bottom && putElement('bottom', null)}
      {left && putElement(null, 'left')}
      {!fixedResizerLines && !showHalfFixersKeyActiveMode && (
        <>
          {right && putElement('top', 'right')}
          {top && left && putElement('top', 'left')}
          {bottom && right && putElement('bottom', 'right')}
          {bottom && left && putElement('bottom', 'left')}
        </>
      )}
    </Resizers>
  );
};

const size = 15;
const sizePx = `${size}px`;
const onBoard = `${-size / 2}px`;
const boardColor = 'white';

const Resizers = styled.div<{
  $fixedResizerLines: FixedResizerLines | null;
  $config: ScreenTranslationPositionConfig;
  $showHalfFixersKeyActiveMode: ShowHalfFixersKeyActiveMode;
}>`
  .resizer {
    position: absolute;

    ${props =>
      (props.$showHalfFixersKeyActiveMode === 'ctrl' ||
        (props.$showHalfFixersKeyActiveMode === 'shift' && props.$fixedResizerLines) ||
        props.$fixedResizerLines) &&
      css`
        &:hover {
          background: ${boardColor};
          opacity: 0.3;
        }
      `}

    &-top {
      top: ${onBoard};

      &-left {
        top: ${onBoard};
        cursor: se-resize;
      }

      &-right {
        top: ${onBoard};
        cursor: sw-resize;
      }
    }

    &-bottom {
      bottom: ${onBoard};

      &-left {
        bottom: ${onBoard};
        cursor: ne-resize;
      }

      &-right {
        bottom: ${onBoard};
        cursor: nw-resize;
      }
    }

    &-left {
      left: ${onBoard};
    }

    &-right {
      right: ${onBoard};
    }

    &-top,
    &-bottom {
      left: 0;
      height: ${sizePx};
      width: 100%;
      cursor: ${props => (props.$fixedResizerLines ? 'text' : 'ns-resize')};

      &-right {
        right: ${onBoard};
      }

      &-left {
        left: ${onBoard};
      }

      &-left,
      &-right {
        height: ${sizePx};
        width: ${sizePx};
      }
    }

    &-left,
    &-right {
      top: 0;
      height: 100%;
      width: ${sizePx};
      cursor: ${props => (props.$fixedResizerLines ? 'vertical-text' : 'ew-resize')};
    }
  }
`;
