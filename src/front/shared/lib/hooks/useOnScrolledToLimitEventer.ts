import { RefObject, useEffect, useMemo } from 'react';
import { emptyFunc, Eventer } from 'shared/utils';
import { addEventListenerPipe, hookEffectPipe } from '../hookEffectPipe';
import { mylib } from '../my-lib';

export const useOnScrolledToLimitEventer = (listRef: RefObject<HTMLDivElement | null>) => {
  const eventerScope = useMemo(() => Eventer.createValue<'start' | 'end'>(), []);

  useEffect(() => {
    let onUnmount = emptyFunc;
    const timeout = setTimeout(() => {
      if (listRef.current === null) return;
      const target = mylib.findElementScrollParent(listRef.current);
      if (target == null) return;

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
