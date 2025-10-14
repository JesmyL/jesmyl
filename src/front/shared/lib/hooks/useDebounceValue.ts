import { useEffect, useState } from 'react';

export const useDebounceValue = <Value>(value: Value, debounceTime = 300) => {
  const valueState = useState(value);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTimeoutEffect(valueState[1], debounceTime, value), [debounceTime, value]);

  return valueState[0];
};
