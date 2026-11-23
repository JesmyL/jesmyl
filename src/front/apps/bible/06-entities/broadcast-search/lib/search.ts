import { lazyInit } from 'shared/utils/lazyInit';
import { BibleBroadcastSearchResponse, IBibleBroadcastSearchRequest } from '../ui/model';
import BibleBroadcastSearchWorker from '../ui/worker?worker';

const workerLazy = lazyInit(() => new BibleBroadcastSearchWorker());

let searchRequestToken = 0;

export const bibleBroadcastSearchListen = (
  request: IBibleBroadcastSearchRequest,
  onResponse: (response: BibleBroadcastSearchResponse) => void,
) => {
  const token = ++searchRequestToken;
  const worker = workerLazy();

  worker.onmessage = (event: MessageEvent<BibleBroadcastSearchResponse>) => {
    if (event.data.token !== searchRequestToken) return;

    onResponse(event.data);
  };
  worker.postMessage({ ...request, token });
};
