import { TsjrpcClient } from '#basis/lib/Tsjrpc.client';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { cmIDB } from '../state/cmIDB';

export const cmTsjrpcClient = new (class Cm extends TsjrpcClient<CmTsjrpcModel> {
  constructor() {
    super({
      scope: 'Cm',
      methods: {
        requestFreshes: true,
        exchangeFreshComCommentBlocks: true,
        getComwVisits: true,
        printComwVisit: true,
        takeComwVisitsCount: true,
        replaceUserAltCommentBlocks: true,
        pullUserAltCommentBlock: true,

        takeFreshComAudioMarksPack: pack => {
          if (pack == null) return;
          cmIDB.tb.audioTrackMarks.put(pack);
        },
      },
    });
  }
})();
