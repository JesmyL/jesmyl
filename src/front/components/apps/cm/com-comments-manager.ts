import { makeToastKOMoodConfig } from '#shared/ui/modal/toast.configs';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { useAuth } from '$index/atoms';
import { atom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { cmTsjrpcClient } from './tsjrpc/basic.tsjrpc.methods';

export const useTrySendComCommentBlocks = () => {
  const auth = useAuth();
  const localBlocks = useLiveQuery(() => cmIDB.tb.localComCommentBlocks.toArray());

  useEffect(() => {
    if (!localBlocks?.length) return;
    if (!auth) {
      toast('Не авторизован', makeToastKOMoodConfig());
      return;
    }

    cmTsjrpcClient.exchangeFreshComCommentBlocks({
      modifiedComments: localBlocks,
      clientDateNow: Date.now(),
    });
  }, [auth, localBlocks]);
};

const isSendAtom = atom(false, 'comComments:isSend');
/** @deprecated */
export const trySendComComments = async () => {
  if (isSendAtom.get()) return;

  const localComments = await cmIDB.tb.comComments.toArray();

  await cmTsjrpcClient.exchangeFreshComComments({
    modifiedComments: localComments.map(comment => ({ ...comment, isSavedLocal: undefined })),
    clientDateNow: Date.now(),
  });

  isSendAtom.set(true);
};
