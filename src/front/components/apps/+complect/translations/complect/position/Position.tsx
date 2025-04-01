import { useUpdateCmCurrentTranslationConfig } from 'front/components/apps/cm/translation/complect/controlled/hooks/update-config';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled, { RuleSet, css } from 'styled-components';
import { useFixedResizerLines } from '../atoms';
import { defaultScreenTranslationPositionConfig } from '../defaults';
import { FixedResizerLines, ScreenTranslationPositionConfig } from '../model';
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
  config: ScreenTranslationPositionConfig;
  updateConfig?: (config: Partial<ScreenTranslationPositionConfig>) => void;
  resizeOnly?: ScreenResizerResizeOnly;
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
  const currUpdateConfig = useUpdateCmCurrentTranslationConfig();
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
    updateConfig(defaultScreenTranslationPositionConfig);
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
  inc: ScreenResizerResizeOnly,
  param: 'top' | 'right' | 'bottom' | 'left',
  borderColor?: string,
) => (inc.includes(param) ? `border-${param}-color: ${borderColor ?? visibleBorderColor};` : '');

const Rect = styled.div<{
  $top: number;
  $left: number;
  $width: number;
  $height: number;
  $resizeOnly: ScreenResizerResizeOnly | und;
  $isCantMove: boolean | und;
  $fixedResizerLines: FixedResizerLines | null;
  $config: ScreenTranslationPositionConfig;
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
                  ${borderColorInclude(props.$resizeOnly, 'left', anchorBorderColor)};
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
                  ${borderColorInclude(props.$resizeOnly, 'right', anchorBorderColor)};
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
                  ${borderColorInclude(props.$resizeOnly, 'bottom')}
                  ${borderColorInclude(props.$resizeOnly, 'top')}
                  ${borderColorInclude(props.$resizeOnly, 'left', targetBorderColor)}
                  ${borderColorInclude(props.$resizeOnly, 'right', targetBorderColor)}
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
                  ${borderColorInclude(props.$resizeOnly, 'top', anchorBorderColor)};
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
                  ${borderColorInclude(props.$resizeOnly, 'bottom', anchorBorderColor)};
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
                  ${borderColorInclude(props.$resizeOnly, 'right')}
                  ${borderColorInclude(props.$resizeOnly, 'left')}
                  ${borderColorInclude(props.$resizeOnly, 'top', targetBorderColor)};
                  ${borderColorInclude(props.$resizeOnly, 'bottom', targetBorderColor)};
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
      ${borderColorInclude(props.$resizeOnly, 'top')}
      ${borderColorInclude(props.$resizeOnly, 'right')}
      ${borderColorInclude(props.$resizeOnly, 'bottom')}
      ${borderColorInclude(props.$resizeOnly, 'left')}
    `;
  }}

  ${props => css`
    left: ${props.$left}%;
    top: ${props.$top}%;
    width: ${props.$width}%;
    height: ${props.$height}%;
  `}
`;
