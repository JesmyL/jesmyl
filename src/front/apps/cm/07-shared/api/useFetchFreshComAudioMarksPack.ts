import { mylib } from '#shared/lib/my-lib';
import { useQuery } from '@tanstack/react-query';
import { CmComWid } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { getCmComFreshAudioMarksPack } from '../lib/getFresh';
import { cmIDB } from '../state';

export const useFetchFreshComAudioMarksPack = (comScalar: CmCom | CmComWid | nil) => {
  return useQuery({
    queryKey: ['useFetchFreshComAudioMarksPack', mylib.isNum(comScalar) ? comScalar : comScalar?.wid],
    enabled: comScalar != null,
    staleTime: 10000,
    queryFn: async () => {
      if (comScalar == null) return null;
      const comAudio = mylib.isNum(comScalar) ? (await cmIDB.tb.coms.get(comScalar))?.al : comScalar.audio;

      if (comAudio == null) return null;

      return Promise.all(comAudio.map(getCmComFreshAudioMarksPack));
    },
  });
};
