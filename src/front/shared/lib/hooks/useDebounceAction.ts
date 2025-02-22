import { useMemo, useRef } from 'react';

export const useDebounceAction = <Callback extends (...args: any[]) => void>(
  callback: Callback,
  debounceTime = 100,
) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useMemo(() => {
    let debounceTimeOut: TimeOut;

    return (...args: []) => {
      clearTimeout(debounceTimeOut);
      debounceTimeOut = setTimeout(callbackRef.current as never, debounceTime, ...args);
    };
  }, [debounceTime]) as Callback;
};
