import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';
import { useMutation } from '@tanstack/react-query';

export const useQuestionerBlankRedactorAddBlankTemplateMutation = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (args: Parameters<typeof questionerAdminTsjrpcClient.addBlankTemplate>[0]) =>
      questionerAdminTsjrpcClient.addBlankTemplate(args),
    onSuccess,
  });
};
