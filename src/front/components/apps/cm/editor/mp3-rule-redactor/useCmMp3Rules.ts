import { useEffect, useState } from 'react';
import { CmMp3Rule } from 'shared/api';
import { cmEditorClientInvocatorMethods } from '../cm-editor-invocator.methods';

export const useCmMp3Rules = () => {
  const [mp3Rules, setMp3Rules] = useState<CmMp3Rule[]>([]);

  useEffect(() => {
    (async () => {
      const mp3Rules = await cmEditorClientInvocatorMethods.getMp3RulesList(null);
      setMp3Rules(mp3Rules);
    })();
  }, []);

  return mp3Rules;
};
