import { useToast } from '#shared/ui/modal/useToast';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { useAuth } from '$index/atoms';
import { atom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import { cmTsjrpcClient } from './tsjrpc/basic.tsjrpc.methods';

export const useTrySendComCommentBlocks = () => {
  const auth = useAuth();
  const toast = useToast();
  const localBlocks = useLiveQuery(() => cmIDB.tb.localComCommentBlocks.toArray());

  useEffect(() => {
    if (!localBlocks?.length) return;
    if (!auth) {
      toast('Не авторизован', { mood: 'ko' });
      return;
    }

    cmTsjrpcClient.exchangeFreshComCommentBlocks({
      modifiedComments: localBlocks,
      clientDateNow: Date.now(),
    });
  }, [auth, localBlocks, toast]);
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
