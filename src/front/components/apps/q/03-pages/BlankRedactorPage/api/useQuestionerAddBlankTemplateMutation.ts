import { questionerAdminTsjrpcClient } from '$q/processes/tsjrpc/admin.tsjrpc';
import { useMutation } from '@tanstack/react-query';

export const useQuestionerAddBlankTemplateMutation = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (args: Parameters<typeof questionerAdminTsjrpcClient.addBlankTemplate>[0]) =>
      questionerAdminTsjrpcClient.addBlankTemplate(args),
    onSuccess,
  });
};
