import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { addEventListenerPipe, hookEffectPipe } from './hookEffectPipe';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const onChildInViewPort = (
  listNode: HTMLDivElement,
  isScrollingRef: { current: boolean },
  onResizeNum: (ink: (num: number) => number) => void,
  filterElements: (element: HTMLElement) => boolean,
  onElementEnterViewPort: (element: HTMLElement) => void,
) => {
  const topsMap = new Map<number, HTMLElement>();
  let scrollTimeout: TimeOut;
  let isScrollingTimeout: TimeOut;
  let resizeDebounceTimeOut: TimeOut;
  const children = listNode.children;

  for (let i = 0; i < children.length; i++) {
    const child = children.item(i) as HTMLElement;
    if (filterElements(child)) topsMap.set(child.offsetTop, child);
  }

  const tops = Array.from(topsMap.keys());
  let isResizing = false;
  let isScaling = false;

  return hookEffectPipe()
    .pipe(
      addEventListenerPipe(listNode, 'touchstart', e => {
        if (e.touches.length > 1) {
          isScaling = true;
          isScrollingRef.current = false;
        }
      }),

      addEventListenerPipe(
        listNode,
        'touchmove',
        e => {
          if (isScaling || e.touches.length > 1) {
            e.preventDefault();
          }
        },
        { passive: false },
      ),

      addEventListenerPipe(listNode, 'touchend', e => {
        if (e.touches.length < 2) {
          isScaling = false;
          isScrollingRef.current = true;
        }
      }),

      addEventListenerPipe(listNode, 'gesturestart' as 'click', e => e.preventDefault(), { passive: false }),
      addEventListenerPipe(listNode, 'gesturechange' as 'click', e => e.preventDefault(), { passive: false }),

      addEventListenerPipe(window, 'resize', () => {
        isResizing = true;
        clearTimeout(resizeDebounceTimeOut);
        resizeDebounceTimeOut = setTimeout(() => {
          isResizing = false;
          onResizeNum(num => num + 1);
        }, 100);
      }),

      addEventListenerPipe(listNode, 'scroll', e => {
        if (isScaling || isResizing) {
          e.preventDefault();
          return;
        }

        isScrollingRef.current = true;
        clearTimeout(isScrollingTimeout);
        isScrollingTimeout = setTimeout(() => (isScrollingRef.current = false), 300);

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          let start = 0;
          let end = tops.length - 1;
          const scrollTop = listNode.scrollTop;

          if (scrollTop < 0) {
            if (topsMap.has(0)) onElementEnterViewPort(topsMap.get(0)!);

            return;
          } else if (scrollTop >= tops[end] - 50) {
            const top = topsMap.get(tops[end]);

            if (top === undefined) return;
            onElementEnterViewPort(top);

            return;
          }

          while (start <= end) {
            const middle = Math.floor((start + end) / 2);

            if (
              (tops[middle] <= scrollTop && tops[middle + 1] >= scrollTop) ||
              (tops[middle] >= scrollTop && tops[middle + 1] <= scrollTop)
            ) {
              const top = topsMap.get(tops[middle]);

              if (top === undefined) return;

              onElementEnterViewPort(top);
              break;
            } else if (tops[middle] < scrollTop) start = middle + 1;
            else end = middle - 1;
          }
        }, 10);
      }),
    )
    .effect();
};

export const findElementScrollParent = (element: Element | nil): Element['parentElement'] | und => {
  if (element == null) return;

  while (true) {
    if (element.scrollHeight !== element.clientHeight) break;
    if (element.parentElement === null) return;
    element = element.parentElement;
  }

  return element as never;
};

export const setInputHeightByContent = (inputNode: HTMLInputElement | HTMLTextAreaElement) => {
  inputNode.style.height = '1px';
  inputNode.style.transition = 'height .2s linear';
  inputNode.style.height = inputNode.scrollHeight ? `${inputNode.scrollHeight}px` : '1.5em';
};
