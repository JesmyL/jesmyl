import { cmIDB } from '$cm/basis/lib/cmIDB';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import { cmTsjrpcClient } from './tsjrpc/basic.tsjrpc.methods';

export const useTrySendComCommentBlocks = () => {
  const localBlocks = useLiveQuery(() => cmIDB.tb.localComCommentBlocks.toArray());

  useEffect(() => {
    if (!localBlocks?.length) return;

    cmTsjrpcClient.exchangeFreshComCommentBlocks({
      modifiedComments: localBlocks,
      clientDateNow: Date.now(),
    });
  }, [localBlocks]);
};
