import { useQuery } from '@tanstack/react-query';
import { CmComWid } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { checkIsNil, checkIsNotNil, checkIsNumber } from 'shared/utils/checkIs';
import { getCmComFreshAudioMarksPack } from '../lib/getFresh';
import { cmIDB } from '../state';

export const useFetchFreshComAudioMarksPack = (comScalar: CmCom | CmComWid | nil) => {
  return useQuery({
    queryKey: ['useFetchFreshComAudioMarksPack', checkIsNumber(comScalar) ? comScalar : comScalar?.wid],
    enabled: checkIsNotNil(comScalar),
    staleTime: 10000,
    queryFn: async () => {
      if (checkIsNil(comScalar)) return null;
      const com = checkIsNumber(comScalar) ? await cmIDB.tb.coms.get(comScalar) : comScalar.top;

      if (checkIsNil(com?.w)) return null;

      return getCmComFreshAudioMarksPack(com.w);
    },
  });
};
