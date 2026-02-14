import { useCallback, useRef } from 'react';

export const useDebounceCallback = (debounceTime = 500) => {
  const debounceRef = useRef<TimeOut | null>(null);

  return useCallback(
    (callback: () => void, subDebounceTime = debounceTime) => {
      clearTimeout(debounceRef.current!);

      debounceRef.current = setTimeout(() => {
        callback();
        debounceRef.current = null;
      }, subDebounceTime);
    },
    [debounceTime],
  );
};
