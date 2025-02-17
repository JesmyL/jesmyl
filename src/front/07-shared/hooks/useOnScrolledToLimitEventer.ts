import { RefObject, useEffect, useMemo } from 'react';
import { Eventer } from 'shared/utils';
import { addEventListenerPipe, hookEffectPipe } from '../lib/hookEffectPipe';

export const useOnScrolledToLimitEventer = (listRef: RefObject<HTMLDivElement>) => {
  const eventerScope = useMemo(() => Eventer.createValue<'start' | 'end'>(), []);

  useEffect(() => {
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

    return hookEffectPipe()
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
  }, [eventerScope, listRef]);

  return eventerScope;
};
