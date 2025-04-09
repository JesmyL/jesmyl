import { RefObject, useEffect, useMemo } from 'react';
import { emptyFunc, Eventer } from 'shared/utils';
import { addEventListenerPipe, hookEffectPipe } from '../hookEffectPipe';

export const useOnScrolledToLimitEventer = (listRef: RefObject<HTMLDivElement | null>) => {
  const eventerScope = useMemo(() => Eventer.createValue<'start' | 'end'>(), []);

  useEffect(() => {
    let onUnmount = emptyFunc;
    const timeout = setTimeout(() => {
      if (listRef.current === null) return;
      let target = listRef.current;

      while (true) {
        if (target.scrollHeight !== target.clientHeight) break;
        if (target.parentElement === null) return;
        target = target.parentElement as never;
      }

      let prevIsTopBorder = false;
      let prevIsBottomBorder = true;
      let isTopBorder = false;
      let isBottomBorder = false;

      onUnmount = hookEffectPipe()
        .pipe(
          addEventListenerPipe(target, 'scroll', () => {
            const scrollTop = Math.abs(target.scrollTop);

            isTopBorder =
              target.scrollHeight - scrollTop < target.clientHeight * 2 ||
              target.scrollHeight - scrollTop < target.clientHeight * 0.2;
            isBottomBorder = scrollTop < target.clientHeight || scrollTop < target.clientHeight * 0.2;

            if (!prevIsTopBorder && isTopBorder) eventerScope.invoke('end');
            if (!prevIsBottomBorder && isBottomBorder) eventerScope.invoke('start');

            prevIsTopBorder = isTopBorder;
            prevIsBottomBorder = isBottomBorder;
          }),
        )
        .effect();
    }, 100);

    return () => {
      onUnmount();
      clearTimeout(timeout);
    };
  }, [eventerScope, listRef]);

  return eventerScope;
};
