import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { cmIDB } from '../state/cmIDB';

export const cmTsjrpcClient = new (class Cm extends TsjrpcClient<CmTsjrpcModel> {
  constructor() {
    super({
      scope: 'Cm',
      methods: {
        takeFreshComAudioMarksPack: {
          onResponse: pack => {
            if (pack == null) return;
            cmIDB.tb.audioTrackMarks.put(pack);
          },
        },
      },
    });
  }
})();
