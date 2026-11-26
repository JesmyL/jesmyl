import { cmEditorClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useEffect, useState } from 'react';
import { EeStorePack } from 'shared/api';
import { emptyFunc } from 'shared/utils';

export const useEeWordsSlice = (words: string[]) => {
  const [pack, setPack] = useState<EeStorePack>({});
  const key = words.join('\n');

  useEffect(() => {
    if (!key) {
      setPack({});
      return;
    }

    let isActual = true;

    cmEditorClientTsjrpcMethods
      .getEEWords({ words: key.split('\n') })
      .then(pack => isActual && setPack(pack))
      .catch(emptyFunc);

    return () => {
      isActual = false;
    };
  }, [key]);

  return pack;
};

export const useEeWordsTotal = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let isActual = true;

    cmEditorClientTsjrpcMethods
      .searchEEWords({ query: '', limit: 0 })
      .then(({ total }) => isActual && setTotal(total))
      .catch(emptyFunc);

    return () => {
      isActual = false;
    };
  }, []);

  return total;
};
