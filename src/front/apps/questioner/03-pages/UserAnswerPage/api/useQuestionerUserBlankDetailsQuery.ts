import { questionerUserTsjrpcClient } from '$q/shared/tsjrpc/user.tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { QuestionerBlank, QuestionerBlankWid } from 'shared/model/q';

export const useQuestionerUserAnswerDetailsQuery = (blankw: QuestionerBlankWid, adminBlank: QuestionerBlank | nil) => {
  return useQuery({
    queryKey: ['useQuestionerUserAnswerDetailsQuery', blankw],
    queryFn: () => questionerUserTsjrpcClient.getUserBlank({ blankw }),
    enabled: () => adminBlank == null,
    refetchOnMount: true,
    staleTime: 1000,
  });
};
