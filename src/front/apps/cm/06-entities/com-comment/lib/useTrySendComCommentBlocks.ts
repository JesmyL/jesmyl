import { makeToastKOMoodConfig } from '#shared/ui/modal/toast.configs';
import { cmIDB } from '$cm/shared/state';
import { cmTsjrpcClient } from '$cm/shared/tsjrpc';
import { useAuth } from '$index/atoms';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const useCmComCommentTrySendBlocks = () => {
  const auth = useAuth();
  const localBlocks = useLiveQuery(() => cmIDB.tb.localComCommentBlocks.toArray());

  useEffect(() => {
    if (!localBlocks?.length) return;
    if (!auth.login) {
      toast('Не авторизован', makeToastKOMoodConfig());
      return;
    }

    cmTsjrpcClient.exchangeFreshComCommentBlocks({
      modifiedComments: localBlocks,
      clientDateNow: Date.now(),
    });
  }, [auth, localBlocks]);
};
