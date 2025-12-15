import { useCmBroadcastUpdateCurrentConfig } from '$cm/widgets/broadcast/hooks/update-config';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled, { RuleSet, css } from 'styled-components';
import { useFixedResizerLines } from '../atoms';
import { defaultScreenBroadcastPositionConfig } from '../defaults';
import { BroadcastResizeBorderPositions, FixedResizerLines, ScreenBroadcastPositionConfig } from '../model';
import { PositionConfiguratorsResizersHalfWrapperFixer } from './complect/HalfWrapperFixer';
import { ShowHalfFixersKeyActiveMode } from './complect/model';
import { PositionConfiguratorsResizers } from './complect/Resizers';
import { useScreenPositionConfigMouseDownCallback } from './hooks/mouse-down-callback';

type Top = 'top' | '';
type Left = 'left' | ' left' | '';
type Right = 'right' | ' right' | '';
type Bottom = 'bottom' | ' bottom' | '';

export type ScreenResizerResizeOnly = `${Top}${Right}${Bottom}${Left}`;

interface Props {
  config: ScreenBroadcastPositionConfig;
  updateConfig?: (config: Partial<ScreenBroadcastPositionConfig>) => void;
  resizeOnly?: BroadcastResizeBorderPositions[];
  isCantMove?: boolean;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

export const ScreenTranslateCurrentPositionConfigurators = ({
  config,
  resizeOnly,
  isCantMove,
  wrapperRef,
  updateConfig: topUpdateConfig,
}: Props) => {
  const currUpdateConfig = useCmBroadcastUpdateCurrentConfig();
  const updateConfig = topUpdateConfig ?? currUpdateConfig;

  const [top, setTop] = useState(config.top);
  const [left, setLeft] = useState(config.left);
  const [width, setWidth] = useState(config.width);
  const [height, setHeight] = useState(config.height);
  const rectRef = useRef<HTMLDivElement>(null);
  const fixedResizerLines = useFixedResizerLines();
  const [showHalfFixersKeyActiveMode, setShowHalfFixersKeyActiveMode] = useState<ShowHalfFixersKeyActiveMode>(null);

  useEffect(() => {
    if (showHalfFixersKeyActiveMode) {
      const onKeyUp = (event: KeyboardEvent) => {
        setShowHalfFixersKeyActiveMode(
          event.ctrlKey && event.shiftKey ? null : event.ctrlKey ? 'ctrl' : event.shiftKey ? 'shift' : null,
        );
      };
      window.addEventListener('keyup', onKeyUp);

      return () => window.removeEventListener('keyup', onKeyUp);
    }

    const onKeyDown = (event: KeyboardEvent) => {
      setShowHalfFixersKeyActiveMode(
        event.ctrlKey && event.shiftKey ? null : event.ctrlKey ? 'ctrl' : event.shiftKey ? 'shift' : null,
      );
      if (event.ctrlKey || event.shiftKey) window.removeEventListener('keydown', onKeyDown);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showHalfFixersKeyActiveMode]);

  const setOnMove = useMemo(() => {
    let timeout: TimeOut;

    return (callback: ((event: MouseEvent) => void) | null) => {
      if (wrapperRef.current === null) return;
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        if (!callback || wrapperRef.current === null) return;

        const removeCb = () => {
          wrapperRef.current?.removeEventListener('mousemove', callback);
          wrapperRef.current?.removeEventListener('mouseup', removeCb);
        };

        wrapperRef.current.addEventListener('mouseup', removeCb);
        wrapperRef.current.addEventListener('mousemove', callback);
      }, 100);
    };
  }, [wrapperRef]);

  useEffect(() => {
    setTop(config.top);
    setLeft(config.left);
    setWidth(config.width);
    setHeight(config.height);

    return setTimeoutEffect(() => {
      if (rectRef.current === null) return;
      rectRef.current.style.top = '';
      rectRef.current.style.left = '';
      rectRef.current.style.width = '';
      rectRef.current.style.height = '';
    });
  }, [config.height, config.left, config.top, config.width]);

  const onMouseDown = useScreenPositionConfigMouseDownCallback(
    isCantMove,
    rectRef,
    wrapperRef,
    updateConfig,
    setOnMove,
  );
  const onRectDoubleClick = useCallback(() => {
    if (isCantMove) return;
    setOnMove(null);
    updateConfig(defaultScreenBroadcastPositionConfig);
  }, [isCantMove, setOnMove, updateConfig]);

  return (
    <>
      {(showHalfFixersKeyActiveMode === 'ctrl' ||
        (fixedResizerLines?.type === 'vert' && fixedResizerLines.value === 50)) && (
        <PositionConfiguratorsResizersHalfWrapperFixer prop="vert" />
      )}
      {(showHalfFixersKeyActiveMode === 'ctrl' ||
        (fixedResizerLines?.type === 'horz' && fixedResizerLines.value === 50)) && (
        <PositionConfiguratorsResizersHalfWrapperFixer prop="horz" />
      )}
      <Rect
        $top={top}
        $left={left}
        $width={width}
        $height={height}
        $resizeOnly={resizeOnly}
        $isCantMove={isCantMove}
        $fixedResizerLines={fixedResizerLines}
        $config={config}
        ref={rectRef}
        onDoubleClick={fixedResizerLines === null ? onRectDoubleClick : undefined}
        onMouseDown={fixedResizerLines === null ? onMouseDown : undefined}
      >
        <PositionConfiguratorsResizers
          setOnMove={setOnMove}
          updateConfig={updateConfig}
          rectRef={rectRef}
          wrapperRef={wrapperRef}
          resizeOnly={resizeOnly}
          config={config}
          fixedResizerLines={fixedResizerLines}
          showHalfFixersKeyActiveMode={showHalfFixersKeyActiveMode}
        />
      </Rect>
    </>
  );
};

const visibleBorderColor = 'white';
const targetBorderColor = 'blue';
const anchorBorderColor = 'yellow';

const borderColorInclude = (
  inc: BroadcastResizeBorderPositions[],
  param: BroadcastResizeBorderPositions,
  borderColor?: string,
) => (inc.includes(param) ? `border-${param}-color: ${borderColor ?? visibleBorderColor};` : '');

const Rect = styled.div<{
  $top: number;
  $left: number;
  $width: number;
  $height: number;
  $resizeOnly: BroadcastResizeBorderPositions[] | und;
  $isCantMove: boolean | und;
  $fixedResizerLines: FixedResizerLines | null;
  $config: ScreenBroadcastPositionConfig;
}>`
  position: absolute;
  z-index: 100;
  box-sizing: content-box;
  border: 2px dotted transparent;

  ${props => !props.$isCantMove && !props.$fixedResizerLines && 'cursor: move;'}

  ${props => {
    if (props.$fixedResizerLines !== null) {
      const type = props.$fixedResizerLines.type;
      const value = props.$fixedResizerLines.value;

      const setFixes = (): RuleSet<object> | null => {
        if (type === 'horz') {
          if (value === props.$config.left)
            return props.$resizeOnly
              ? css`
                  border-color: transparent;
                  ${borderColorInclude(props.$resizeOnly, BroadcastResizeBorderPositions.Left, anchorBorderColor)};
                `
              : css`
                  border-color: ${visibleBorderColor};
                  border-left-color: ${anchorBorderColor};
                  border-right-color: ${targetBorderColor};
                `;

          if (value === props.$config.left + props.$config.width)
            return props.$resizeOnly
              ? css`
                  border-color: transparent;
                  ${borderColorInclude(props.$resizeOnly, BroadcastResizeBorderPositions.Right, anchorBorderColor)};
                `
              : css`
                  border-color: ${visibleBorderColor};
                  border-right-color: ${anchorBorderColor};
                  border-left-color: ${targetBorderColor};
                `;

          return css`
            ${props.$resizeOnly
              ? css`
                  border-color: transparent;
                  ${borderColorInclude(props.$resizeOnly, BroadcastResizeBorderPositions.Bottom)}
                  ${borderColorInclude(props.$resizeOnly, BroadcastResizeBorderPositions.Top)}
                  ${borderColorInclude(props.$resizeOnly, BroadcastResizeBorderPositions.Left, targetBorderColor)}
                  ${borderColorInclude(props.$resizeOnly, BroadcastResizeBorderPositions.Right, targetBorderColor)}
                `
              : css`
                  border-color: ${visibleBorderColor};
                  border-left-color: ${targetBorderColor};
                  border-right-color: ${targetBorderColor};
                `}
          `;
        } else {
          if (value === props.$config.top)
            return props.$resizeOnly
              ? css`
                  border-color: transparent;
                  ${borderColorInclude(props.$resizeOnly, BroadcastResizeBorderPositions.Top, anchorBorderColor)};
                `
              : css`
                  border-color: ${visibleBorderColor};
                  border-top-color: ${anchorBorderColor};
                  border-bottom-color: ${targetBorderColor};
                `;
          if (value === props.$config.top + props.$config.height)
            return props.$resizeOnly
              ? css`
                  border-color: transparent;
                  ${borderColorInclude(props.$resizeOnly, BroadcastResizeBorderPositions.Bottom, anchorBorderColor)};
                `
              : css`
                  border-color: ${visibleBorderColor};
                  border-bottom-color: ${anchorBorderColor};
                  border-top-color: ${targetBorderColor};
                `;

          return css`
            ${props.$resizeOnly
              ? css`
                  border-color: transparent;
                  ${borderColorInclude(props.$resizeOnly, BroadcastResizeBorderPositions.Right)}
                  ${borderColorInclude(props.$resizeOnly, BroadcastResizeBorderPositions.Left)}
                  ${borderColorInclude(props.$resizeOnly, BroadcastResizeBorderPositions.Top, targetBorderColor)};
                  ${borderColorInclude(props.$resizeOnly, BroadcastResizeBorderPositions.Bottom, targetBorderColor)};
                `
              : css`
                  border-color: ${visibleBorderColor};
                  border-top-color: ${targetBorderColor};
                  border-bottom-color: ${targetBorderColor};
                `}
          `;
        }
      };

      const fixes = setFixes();
      if (fixes !== null) return fixes;
    }

    if (props.$resizeOnly === undefined) return `border-color: ${visibleBorderColor};`;

    return `
      ${borderColorInclude(props.$resizeOnly, BroadcastResizeBorderPositions.Top)}
      ${borderColorInclude(props.$resizeOnly, BroadcastResizeBorderPositions.Right)}
      ${borderColorInclude(props.$resizeOnly, BroadcastResizeBorderPositions.Bottom)}
      ${borderColorInclude(props.$resizeOnly, BroadcastResizeBorderPositions.Left)}
    `;
  }}

  ${props => css`
    left: ${props.$left}%;
    top: ${props.$top}%;
    width: ${props.$width}%;
    height: ${props.$height}%;
  `}
`;
