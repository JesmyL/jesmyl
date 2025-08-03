import { useCallback, useRef } from 'react';

export const useDeferredCallback = (debounceTime = 500) => {
  const debounceRef = useRef<TimeOut | null>(null);

  return useCallback(
    (callback: () => void, subDebounceTime = debounceTime, initInvoke = true) => {
      if (initInvoke && debounceRef.current === null) callback();
      clearTimeout(debounceRef.current!);

      debounceRef.current = setTimeout(() => {
        callback();
        debounceRef.current = null;
      }, subDebounceTime);
    },
    [debounceTime],
  );
};
