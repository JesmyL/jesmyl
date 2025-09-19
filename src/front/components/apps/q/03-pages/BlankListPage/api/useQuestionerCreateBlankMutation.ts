import { questionerAdminTsjrpcClient } from '$q/processes/tsjrpc/admin.tsjrpc';
import { useMutation } from '@tanstack/react-query';

export const useQuestionerCreateBlankMutation = () => {
  return useMutation({
    mutationFn: () => questionerAdminTsjrpcClient.createBlank(),
  });
};
