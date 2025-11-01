import { Button } from '#shared/components/ui/button';
import { Script } from '#shared/ui/tags/Script';
import { RefObject, useEffect, useRef } from 'react';
import { itIt } from 'shared/utils';
import { addEventListenerPipe, hookEffectPipe } from '../hookEffectPipe';
import { mylib } from '../my-lib';
import { excel2jsonParserBox } from '../parseExcel2Json';
import { useActualRef } from './useActualRef';

export const ExcelValueListExtracter = (props: {
  onSuccess: (list: Record<string, string>[], keyValues: Record<string, Set<string>>) => void;
  onFailure?: (error: string) => void;
  children?: (
    defNode: React.ReactNode,
    inputAttrs: { type: 'file'; ref: RefObject<HTMLInputElement | null>; accept: string },
  ) => React.ReactNode;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSuccessRef = useActualRef(props.onSuccess);
  const onFailureRef = useActualRef(props.onFailure);

  useEffect(() => {
    if (inputRef.current === null) return;
    const inputNode = inputRef.current;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(inputNode, 'change', () => {
          if (!inputNode.files?.[0]) return;
          const file = inputNode.files[0];
          inputNode.value = null!;

          (async () => {
            try {
              const parser = await excel2jsonParserBox();
              const list = await parser(file);
              const keyValues: Record<string, Set<string>> = {};

              list.forEach(value => {
                mylib.keys(value).forEach(key => {
                  keyValues[key] ??= new Set();
                  keyValues[key].add(value[key]);
                });
              });

              onSuccessRef.current(list, keyValues);
            } catch (error) {
              onFailureRef.current?.('' + error);
            }
          })();
        }),
      )
      .effect();
  }, [onFailureRef, onSuccessRef]);

  const attrs = { ref: inputRef, type: 'file', accept: '.xls, .xlsx' } as const;

  const defNode = (
    <>
      <Button
        className=""
        icon="FileImport"
        onClick={() => inputRef.current?.click()}
      >
        Выберите Excel файл
      </Button>

      <input
        hidden
        {...attrs}
      />
    </>
  );

  return (
    <>
      <Script
        async
        src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js"
      />
      <Script
        async
        src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.js"
      />

      {(props.children ?? itIt)(defNode, attrs)}
    </>
  );
};
