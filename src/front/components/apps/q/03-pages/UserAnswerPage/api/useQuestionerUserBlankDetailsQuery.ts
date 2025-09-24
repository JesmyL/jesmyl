import { questionerUserTsjrpcClient } from '$q/processes/tsjrpc/user.tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { QuestionerBlankWid } from 'shared/model/q';

export const useQuestionerUserBlankDetailsQuery = (blankw: QuestionerBlankWid) => {
  return useQuery({
    queryKey: ['useQuestionerUserBlankDetailsQuery', blankw],
    queryFn: () => questionerUserTsjrpcClient.getUserBlank({ blankw }),
    refetchOnMount: true,
    staleTime: 1000,
  });
};
