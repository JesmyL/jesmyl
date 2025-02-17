import { useEffect, useRef } from 'react';
import { excel2jsonParserBox } from '../lib/parseExcel2Json';
import { useActualRef } from './useActualRef';

export const useGetExcelValueList = (
  onSuccess: (list: Record<string, string>[]) => void,
  onFailure?: (error: string) => void,
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSuccessRef = useActualRef(onSuccess);
  const onFailureRef = useActualRef(onFailure);

  useEffect(() => {
    if (inputRef.current === null) return;
    const inputNode = inputRef.current;

    return hookEffectLine()
      .addEventListener(inputNode, 'change', () => {
        if (!inputNode.files?.[0]) return;
        const file = inputNode.files[0];
        inputNode.value = null!;

        (async () => {
          try {
            const parser = await excel2jsonParserBox();
            const list = await parser(file);

            onSuccessRef.current(list);
          } catch (error) {
            onFailureRef.current?.('' + error);
          }
        })();
      })
      .effect();
  }, [onFailureRef, onSuccessRef]);

  return { ref: inputRef, type: 'file', accept: '.xls, .xlsx' };
};
