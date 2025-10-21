import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';
import { useQuery } from '@tanstack/react-query';

export const useQuestionerBlankListAdminBlanksQuery = () => {
  return useQuery({
    queryKey: ['useQuestionerBlankListAdminBlanksQuery'],
    queryFn: () => questionerAdminTsjrpcClient.getAdminBlanks(),
  });
};
