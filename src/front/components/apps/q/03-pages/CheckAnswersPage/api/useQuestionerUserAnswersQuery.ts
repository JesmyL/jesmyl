import { questionerAdminTsjrpcClient } from '$q/processes/tsjrpc/admin.tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { QuestionerBlankWid } from 'shared/model/q';

export const useQuestionerUserAnswersQuery = (blankw: QuestionerBlankWid) => {
  return useQuery({
    queryKey: ['useQuestionerUserAnswersQuery', blankw],
    queryFn: () => questionerAdminTsjrpcClient.getUserAnswers({ blankw }),
    refetchOnMount: true,
    staleTime: 1000,
  });
};
