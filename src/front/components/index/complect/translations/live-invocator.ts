import { liveDataAtom, liveDataStreamersAtom } from '@index/atoms';
import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { SchLiveSokiInvocatorModel, SchLiveSokiInvocatorSharesModel } from 'shared/api';

class SchLiveSokiInvocatorClient extends SokiInvocatorClient<SchLiveSokiInvocatorModel> {}
export const schLiveSokiInvocatorClient = new SchLiveSokiInvocatorClient('SchLiveSokiInvocatorClient', {
  next: true,
  reset: true,
  watch: true,
  unwatch: true,
  requestStreamers: true,
});

class SchLiveSokiInvocatorBaseClient extends SokiInvocatorBaseClient<SchLiveSokiInvocatorSharesModel> {}
export const schLiveSokiInvocatorBaseClient = new SchLiveSokiInvocatorBaseClient('SchLiveSokiInvocatorBaseClient', {
  updateData: () => async liveData => liveDataAtom.set(liveData),
  streamersList: () => async streamers => liveDataStreamersAtom.set(streamers),
});
