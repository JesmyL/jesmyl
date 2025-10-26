import { CmCom, cmIDB } from '$cm/ext';
import { useQuery } from '@tanstack/react-query';
import { CmComWid } from 'shared/api';
import { getCmComFreshAudioMarksPack } from '../lib/getFresh';

export const useFetchFreshComAudioMarksPack = (comScalar: CmCom | CmComWid | nil) => {
  return useQuery({
    queryKey: ['useFetchFreshComAudioMarksPack'],
    enabled: comScalar != null,
    queryFn: async () => {
      if (comScalar == null) return null;
      const comAudio = comScalar instanceof CmCom ? comScalar.audio : (await cmIDB.tb.coms.get(comScalar))?.al;

      if (comAudio == null) return null;

      return Promise.all(comAudio.map(getCmComFreshAudioMarksPack));
    },
  });
};
