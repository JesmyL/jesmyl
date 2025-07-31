import { TsjrpcClient } from '#basis/lib/Tsjrpc.client';
import { TsjrpcBaseClient } from '#basis/lib/TsjrpcBase.client';
import { liveDataAtom, liveDataStreamersAtom } from '$index/atoms';
import { SchLiveTsjrpcModel, SchLiveTsjrpcSharesModel } from 'shared/api';

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
