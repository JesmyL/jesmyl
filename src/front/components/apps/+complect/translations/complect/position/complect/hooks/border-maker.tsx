import { useFixedResizerLinesSet } from '../../../atoms';
import { FixedResizerLines, ScreenTranslationPositionConfig } from '../../../model';

const minSize = 2;

export const usePositionConfiguratorResizerBorderMaker = (
  rectRef: React.RefObject<HTMLDivElement | null>,
  wrapperRef: React.RefObject<HTMLDivElement>,
  setOnMove: (callback: ((event: MouseEvent) => void) | null) => void,
  updateConfig: (config: Partial<ScreenTranslationPositionConfig>) => void,
  config: ScreenTranslationPositionConfig,
  fixedResizerLines: FixedResizerLines | null,
) => {
  const setLines = useFixedResizerLinesSet();

  return (vert: 'top' | 'bottom' | null, horz: 'left' | 'right' | null) => (
    <div
      className={'resizer resizer' + (vert === null ? '' : '-' + vert) + (horz === null ? '' : '-' + horz)}
      onClick={
        vert && horz
          ? undefined
          : (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              const rightLim = config.left + config.width;
              const bottomLim = config.top + config.height;

              if (event.ctrlKey) {
                setLines({
                  type: vert ? 'vert' : 'horz',
                  value:
                    vert === 'top'
                      ? config.top
                      : vert === 'bottom'
                        ? bottomLim
                        : horz === 'left'
                          ? config.left
                          : rightLim,
                });
                return;
              }

              if (fixedResizerLines === null) return;
              if (fixedResizerLines.type === 'horz' ? vert : horz) return;
              const newPosition = fixedResizerLines.value;

              if (fixedResizerLines.type === 'horz') {
                setLines(null);

                if ((newPosition === config.left && horz === 'left') || (newPosition === rightLim && horz === 'right'))
                  return;

                if (horz === 'left') {
                  let width =
                    event.shiftKey || newPosition > rightLim
                      ? newPosition + config.width > 100
                        ? 100 - newPosition
                        : config.width
                      : rightLim - newPosition;

                  if (width < minSize) width = minSize;

                  updateConfig({
                    left: newPosition,
                    width,
                  });
                } else {
                  if (event.shiftKey || newPosition < config.left) {
                    if (newPosition - config.width < 0)
                      updateConfig({
                        left: 0,
                        width: newPosition < minSize ? minSize : newPosition,
                      });
                    else updateConfig({ left: newPosition - config.width });
                  } else
                    updateConfig({
                      width: newPosition - config.left < minSize ? minSize : newPosition - config.left,
                    });
                }
              } else {
                setLines(null);

                if ((newPosition === config.top && vert === 'top') || (newPosition === bottomLim && vert === 'bottom'))
                  return;

                if (vert === 'top')
                  if (event.shiftKey || newPosition > bottomLim) {
                    if (newPosition + config.height > 100)
                      updateConfig({
                        top: newPosition,
                        height: 100 - newPosition < minSize ? minSize : 100 - newPosition,
                      });
                    else updateConfig({ top: newPosition });
                  } else {
                    updateConfig({
                      top: newPosition,
                      height: bottomLim - newPosition < minSize ? minSize : bottomLim - newPosition,
                    });
                  }
                else {
                  if (event.shiftKey || newPosition < config.top) {
                    if (newPosition - config.height < 0)
                      updateConfig({
                        top: 0,
                        height: newPosition < minSize ? minSize : newPosition,
                      });
                    else updateConfig({ top: newPosition - config.height });
                  } else
                    updateConfig({
                      height:
                        config.height + (newPosition - bottomLim) < minSize
                          ? minSize
                          : config.height + (newPosition - bottomLim),
                    });
                }
              }
            }
      }
      onMouseDown={
        fixedResizerLines !== null
          ? undefined
          : event => {
              if (rectRef.current === null || wrapperRef.current === null) return null;
              event.stopPropagation();

              const rect = rectRef.current;
              const parent = wrapperRef.current;

              let timeout: TimeOut;

              setOnMove((event: MouseEvent) => {
                if (event.buttons === 0) {
                  setOnMove(null);
                  return;
                }

                clearTimeout(timeout);

                let height = 0;
                let width = 0;
                let top = 0;
                let left = 0;

                const move = (isVert: boolean): boolean => {
                  const posName = isVert ? 'top' : 'left';
                  const sizeName = isVert ? 'height' : 'width';
                  const rectPosition = isVert ? rect.offsetTop : rect.offsetLeft;
                  const parentSize = isVert ? parent.clientHeight : parent.clientWidth;
                  const rectSize = isVert ? rect.clientHeight : rect.clientWidth;
                  const movementProp = isVert ? event.movementY : event.movementX;

                  let sizeParam = 0;
                  let posParam = ((rectPosition + movementProp) / parentSize) * 100;

                  if (posParam < 0) posParam = 0;
                  if (posParam > 100) posParam = 100;

                  if (isVert) top = posParam;
                  else left = posParam;

                  if ((isVert ? vert : horz) === posName) {
                    let positionPx = rectPosition + movementProp;
                    let sizePx = rectSize - movementProp;

                    if (positionPx < 0) positionPx = 0;
                    if (parentSize - positionPx < sizePx) sizePx = parentSize - positionPx;

                    rect.style[sizeName] = sizePx + 'px';
                    rect.style[posName] = positionPx + 'px';
                    sizeParam = (sizePx / parentSize) * 100;

                    if (isVert) height = sizeParam;
                    else width = sizeParam;

                    if ((isVert ? horz : vert) === null) {
                      timeout = setTimeout(() => updateConfig({ [sizeName]: sizeParam, [posName]: posParam }), 300);
                      return true;
                    }
                  } else {
                    let sizePxParam = rectSize + movementProp;

                    if (parentSize - rectPosition < sizePxParam) sizePxParam = parentSize - rectPosition;

                    rect.style[sizeName] = sizePxParam + 'px';
                    sizeParam = (sizePxParam / parentSize) * 100;

                    if (isVert) height = sizeParam;
                    else width = sizeParam;

                    if ((isVert ? horz : vert) === null) {
                      timeout = setTimeout(() => updateConfig({ [sizeName]: sizeParam }), 300);
                      return true;
                    }
                  }

                  return false;
                };

                if (vert !== null && move(true)) return;
                if (horz !== null && move(false)) return;

                timeout = setTimeout(() => updateConfig({ left, top, height, width }), 300);
              });
            }
      }
    />
  );
};
