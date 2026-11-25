import { QueryKey } from '#basis/model/QueryKey.model';
import { questionerUserTsjrpcClient } from '$q/shared/tsjrpc/user.tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { QuestionerBlankWid } from 'shared/model/q';

export const useQuestionerCheckAnswersQuery = (blankw: QuestionerBlankWid) => {
  return useQuery({
    queryKey: [QueryKey.QuestionerCheckAnswers, blankw],
    queryFn: () => questionerUserTsjrpcClient.getUserAnswers({ blankw }),
    refetchOnMount: true,
    staleTime: 1000,
  });
};
