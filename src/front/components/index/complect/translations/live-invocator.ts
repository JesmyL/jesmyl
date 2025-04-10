import { SokiInvocatorClient } from '#basis/lib/SokiInvocator.client';
import { SokiInvocatorBaseClient } from '#basis/lib/SokiInvocatorBase.client';
import { liveDataAtom, liveDataStreamersAtom } from '$index/atoms';
import { SchLiveSokiInvocatorModel, SchLiveSokiInvocatorSharesModel } from 'shared/api';

export const schLiveSokiInvocatorClient = new (class SchLive extends SokiInvocatorClient<SchLiveSokiInvocatorModel> {
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

export const schLiveSokiInvocatorBaseClient =
  new (class SchLiveSokiInvocatorBaseClient extends SokiInvocatorBaseClient<SchLiveSokiInvocatorSharesModel> {
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
