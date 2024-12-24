import { SokiServerDoAction, SokiServerDoActionProps } from 'shared/api';
import { SokiServerSubscribes } from './20-Subscribes';

export class SokiServerLiveTransfers extends SokiServerSubscribes implements SokiServerDoAction<'LiveData'> {
  async doOnLiveData({ eventBody }: SokiServerDoActionProps) {
    if (eventBody.liveData === undefined || eventBody.subscribeData === undefined) return false;

    if (eventBody.liveData === null) delete this.liveData[eventBody.subscribeData];
    else this.liveData[eventBody.subscribeData] = eventBody.liveData;

    const liveData = { [eventBody.subscribeData]: eventBody.liveData };

    this.subscriptions.liveData.map.forEach((capsule, client) => {
      if (client === undefined) return;

      if (capsule.subscribeData === undefined) {
        this.send({ appName: 'index', liveData: this.liveData }, client);
        return;
      }
      if (capsule.subscribeData !== eventBody.subscribeData) return;
      this.send({ appName: 'index', liveData }, client);
    });

    return false;
  }
}
