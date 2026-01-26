import { mylib } from '#shared/lib/my-lib';
import { CmCom, cmIDB } from '$cm/ext';
import { useQuery } from '@tanstack/react-query';
import { CmComWid } from 'shared/api';
import { getCmComFreshAudioMarksPack } from '../lib/getFresh';

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
