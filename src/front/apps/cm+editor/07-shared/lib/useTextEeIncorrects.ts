import { useEffect, useRef, useState } from 'react';
import { IIncorrects } from 'shared/model/cm/Incorrects';
import { useDebounceCallback } from 'shared/utils/useDebounceCallback';
import { cmEditorClientTsjrpcMethods } from './cm-editor.tsjrpc.methods';

export const useTextsEeIncorrects = (texts: string[]) => {
  const [corrects, setCorrects] = useState<IIncorrects[]>([]);
  const debounce = useDebounceCallback();
  const textsRef = useRef(texts);
  textsRef.current = texts;
  const key = JSON.stringify(texts);

  useEffect(() => {
    const list = textsRef.current;

    if (!list.length) {
      setCorrects([]);
      return;
    }

    let isActual = true;

    debounce(() => {
      cmEditorClientTsjrpcMethods
        .checkTextEe({ texts: list })
        .then(result => isActual && setCorrects(result))
        .catch(() => isActual && setCorrects([]));
    });

    return () => {
      isActual = false;
    };
  }, [key, debounce]);

  return corrects;
};

export const useTextEeIncorrects = (text: string | nil) => useTextsEeIncorrects(text ? [text] : [])[0] ?? {};
