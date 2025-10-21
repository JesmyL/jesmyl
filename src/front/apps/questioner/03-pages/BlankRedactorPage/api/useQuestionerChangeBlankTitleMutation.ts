import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';
import { useMutation } from '@tanstack/react-query';

export const useQuestionerBlankRedactorChangeTitleMutation = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (args: Parameters<typeof questionerAdminTsjrpcClient.changeBlankDescription>[0]) =>
      questionerAdminTsjrpcClient.changeBlankDescription(args),
    onSuccess,
  });
};
