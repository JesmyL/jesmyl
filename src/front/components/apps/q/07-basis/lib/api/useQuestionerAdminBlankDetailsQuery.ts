import { questionerAdminTsjrpcClient } from '$q/processes/tsjrpc/admin.tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { QuestionerBlankWid } from 'shared/model/q';

export const useQuestionerAdminBlankDetailsQuery = (blankw: QuestionerBlankWid) => {
  return useQuery({
    queryKey: ['useQuestionerAdminBlankDetailsQuery', blankw],
    queryFn: () => questionerAdminTsjrpcClient.getAdminBlank({ blankw }),
    throwOnError: true,
  });
};
