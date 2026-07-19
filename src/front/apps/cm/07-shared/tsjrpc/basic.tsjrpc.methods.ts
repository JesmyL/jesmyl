import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { cmIDB } from '../state/cmIDB';

export const cmTsjrpcClient = new (class Cm extends TsjrpcClient<CmTsjrpcModel> {
  constructor() {
    super({
      scope: 'Cm',
      methods: {
        takeFreshComAudioMarksPack_v1: {
          onResponse: pack => {
            if (pack) cmIDB.tb.comAudioTrackMarks_v2.put(pack);
          },
        },
        pullComComments: {
          onResponse: comments => {
            if (comments) cmIDB.tb.comCommentBlocks.put(comments);
          },
        },
      },
    });
  }
})();
