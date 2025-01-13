import { useEffect, useState } from 'react';
import { CmMp3Rule } from 'shared/api';
import { cmOtherClientInvocatorMethods } from '../cm-editor-invocator.methods';

export const useCmMp3Rules = () => {
  const [mp3Rules, setMp3Rules] = useState<CmMp3Rule[]>([]);

  useEffect(() => {
    (async () => {
      const mp3Rules = await cmOtherClientInvocatorMethods.getMp3RulesList(null);
      setMp3Rules(mp3Rules);
    })();
  }, []);

  return mp3Rules;
};
