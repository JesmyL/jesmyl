import { useEffect, useState } from 'react';
import { CmMp3Rule } from 'shared/api';
import { cmComClientInvocatorMethods } from '../../cm-invocator-editor.methods';

export const useCmMp3Rules = () => {
  const [mp3Rules, setMp3Rules] = useState<CmMp3Rule[]>([]);

  useEffect(() => {
    (async () => {
      const mp3Rules = await cmComClientInvocatorMethods.getMp3RulesList(null);
      setMp3Rules(mp3Rules);
    })();
  }, []);

  return mp3Rules;
};
