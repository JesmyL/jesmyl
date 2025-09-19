import { questionerAdminTsjrpcClient } from '$q/processes/tsjrpc/admin.tsjrpc';
import { useQuery } from '@tanstack/react-query';

export const useQuestionerAdminBlanksQuery = () => {
  return useQuery({
    queryKey: ['useQuestionerAdminBlanksQuery'],
    queryFn: () => questionerAdminTsjrpcClient.getAdminBlanks(),
  });
};
