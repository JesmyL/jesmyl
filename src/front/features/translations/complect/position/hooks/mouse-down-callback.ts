import { useCallback } from 'react';
import { ScreenTranslationPositionConfig } from '../../model';

export const useScreenPositionConfigMouseDownCallback = (
  isCantMove: boolean | und,
  rectRef: React.RefObject<HTMLDivElement | null>,
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  updateConfig: (config: Partial<ScreenTranslationPositionConfig>) => void,
  setOnMove: (callback: ((event: MouseEvent) => void) | null) => void,
) => {
  return useCallback(() => {
    if (isCantMove || rectRef.current === null || wrapperRef.current === null) return;
    const target = rectRef.current;
    const parent = wrapperRef.current;
    let timeout: TimeOut;

    setTimeout(setOnMove, 0, (event: MouseEvent) => {
      if (event.buttons === 0) {
        setOnMove(null);
        return;
      }
      clearTimeout(timeout);

      let top = 0;
      let left = 0;

      const leftPx =
        parent.clientWidth < target.clientWidth + target.offsetLeft + event.movementX
          ? parent.clientWidth - target.clientWidth
          : target.offsetLeft + event.movementX < 0
            ? 0
            : target.offsetLeft + event.movementX;

      const topPx =
        parent.clientHeight < target.clientHeight + target.offsetTop + event.movementY
          ? parent.clientHeight - target.clientHeight
          : target.offsetTop + event.movementY < 0
            ? 0
            : target.offsetTop + event.movementY;

      if (leftPx !== null) {
        left = (leftPx / parent.clientWidth) * 100;
        target.style.left = left + '%';

        if (topPx === null) {
          timeout = setTimeout(() => updateConfig({ left }), 300);
          return;
        }
      }

      if (topPx !== null) {
        top = (topPx / parent.clientHeight) * 100;
        target.style.top = top + '%';

        if (leftPx === null) {
          timeout = setTimeout(() => updateConfig({ top }), 300);
          return;
        }
      }

      timeout = setTimeout(() => updateConfig({ left, top }), 300);
    });
  }, [isCantMove, rectRef, setOnMove, updateConfig, wrapperRef]);
};
