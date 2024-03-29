import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../shared/store';
import { leaderStoreActions, leaderExer } from '../../Leader.store';
import { SendingComment } from './LeaderComment.model';

const sendingCommentsSelector = (state: RootState) => state.leader.sendingComments;
const isSendingMessagesErrorsSelector = (state: RootState) => state.leader.isSendingMessagesError;

export default function useLeaderComments() {
  const dispatch = useDispatch();
  const sendingComments = useSelector(sendingCommentsSelector);
  const isSendingMessagesError = useSelector(isSendingMessagesErrorsSelector);

  const ret = {
    sendingComments,
    isSendingMessagesError,
    sendAllComments: () => {
      const execs = ret.sendingComments;
      if (!execs?.length) return;

      leaderExer
        .send(execs)
        .then(() => {
          dispatch(leaderStoreActions.sendingComments([]));
          dispatch(leaderStoreActions.isSendingMessagesError(false));
        })
        .catch(() => {
          dispatch(leaderStoreActions.isSendingMessagesError(true));
        });
    },
    sendComment: (exec: SendingComment) => {
      dispatch(leaderStoreActions.sendingComments([...(sendingComments || []), exec]));
    },
  };
  return ret;
}
