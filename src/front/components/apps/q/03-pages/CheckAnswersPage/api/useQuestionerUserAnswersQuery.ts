import { questionerUserTsjrpcClient } from '$q/processes/tsjrpc/user.tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { QuestionerBlankWid } from 'shared/model/q';

export const useQuestionerUserAnswersQuery = (blankw: QuestionerBlankWid) => {
  return useQuery({
    queryKey: ['useQuestionerUserAnswersQuery', blankw],
    queryFn: () => questionerUserTsjrpcClient.getUserAnswers({ blankw }),
    refetchOnMount: true,
    staleTime: 1000,
  });
};
