import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';
import { useMutation } from '@tanstack/react-query';

export const useQuestionerBlankListCreateBlankMutation = () => {
  return useMutation({
    mutationFn: () => questionerAdminTsjrpcClient.createBlank(),
  });
};
