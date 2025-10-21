import { useQuery } from '@tanstack/react-query';
import { QuestionerBlankWid } from 'shared/model/q';
import { questionerAdminTsjrpcClient } from '../tsjrpc/admin.tsjrpc';

export const useQuestionerAdminBlankDetailsQuery = (blankw: QuestionerBlankWid) => {
  return useQuery({
    queryKey: ['useQuestionerAdminBlankDetailsQuery', blankw],
    queryFn: () => questionerAdminTsjrpcClient.getAdminBlank({ blankw }),
    throwOnError: true,
  });
};
