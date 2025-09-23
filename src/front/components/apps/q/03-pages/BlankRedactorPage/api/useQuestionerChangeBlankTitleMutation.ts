import { questionerAdminTsjrpcClient } from '$q/processes/tsjrpc/admin.tsjrpc';
import { useMutation } from '@tanstack/react-query';

export const useQuestionerChangeBlankTitleMutation = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (args: Parameters<typeof questionerAdminTsjrpcClient.changeBlankDescription>[0]) =>
      questionerAdminTsjrpcClient.changeBlankDescription(args),
    onSuccess,
  });
};
