import { questionerAdminTsjrpcClient } from '$q/processes/tsjrpc/admin.tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { QuestionerBlankWid } from 'shared/model/q';

export const useQuestionerBlankDetailsQuery = (blankw: QuestionerBlankWid) => {
  return useQuery({
    queryKey: ['useQuestionerBlankDetailsQuery', blankw],
    queryFn: () => questionerAdminTsjrpcClient.getAdminBlank({ blankw }),
  });
};
