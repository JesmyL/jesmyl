import { questionerUserTsjrpcClient } from '$q/shared/tsjrpc/user.tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { QuestionerBlankWid } from 'shared/model/q';

export const useQuestionerUserAnswerDetailsQuery = (blankw: QuestionerBlankWid) => {
  return useQuery({
    queryKey: ['useQuestionerUserAnswerDetailsQuery', blankw],
    queryFn: () => questionerUserTsjrpcClient.getUserBlank({ blankw }),
    refetchOnMount: true,
    staleTime: 1000,
  });
};
