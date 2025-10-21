import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { TsjrpcBaseClient } from '#basis/tsjrpc/TsjrpcBase.client';
import { SchLiveTsjrpcModel, SchLiveTsjrpcSharesModel } from 'shared/api';
import { liveDataAtom, liveDataStreamersAtom } from '../state';

export const schLiveTsjrpcClient = new (class SchLive extends TsjrpcClient<SchLiveTsjrpcModel> {
  constructor() {
    super({
      scope: 'SchLive',
      methods: {
        next: true,
        reset: true,
        watch: true,
        unwatch: true,
        requestStreamers: true,
      },
    });
  }
})();

export const schLiveTsjrpcBaseClient =
  new (class SchLiveTsjrpcBaseClient extends TsjrpcBaseClient<SchLiveTsjrpcSharesModel> {
    constructor() {
      super({
        scope: 'SchLive',
        methods: {
          updateData: async ({ data: liveData }) => liveDataAtom.set(liveData),
          streamersList: async ({ streamers }) => liveDataStreamersAtom.set(streamers),
        },
      });
    }
  })();
