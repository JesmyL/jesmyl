import { useEffect, useState } from 'react';

export const useDebounceValue = <Value>(value: Value, debounceTime = 300) => {
  const [val, setVal] = useState(value);

  useEffect(() => setTimeoutEffect(setVal, debounceTime, value), [debounceTime, value]);

  return val;
};
