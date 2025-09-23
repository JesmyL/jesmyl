import { questionerAdminTsjrpcClient } from '$q/processes/tsjrpc/admin.tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { QuestionerBlankWid } from 'shared/model/q';

export const useQuestionerUserBlankDetailsQuery = (blankw: QuestionerBlankWid) => {
  return useQuery({
    queryKey: ['useQuestionerUserBlankDetailsQuery', blankw],
    queryFn: () => questionerAdminTsjrpcClient.getUserBlank({ blankw }),
    refetchOnMount: true,
    staleTime: 1000,
  });
};
