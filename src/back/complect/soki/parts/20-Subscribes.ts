import {
  SokiCapsule,
  SokiClientSubData,
  SokiServerDoAction,
  SokiServerDoActionProps,
  SokiStatistic,
  SokiSubscribtionName,
} from 'shared/api';
import { Eventer } from 'shared/utils';
import { WebSocket } from 'ws';
import { SokiServerTransfers } from './10-Transfers';

interface SubscribeCapsule {
  map: Map<WebSocket, SokiCapsule>;
  onClientSubscribe: (client: WebSocket, capsule: SokiCapsule) => void;
  onClientUnsubscribe: (client: WebSocket) => void;
}

export class SokiServerSubscribes extends SokiServerTransfers implements SokiServerDoAction<'Subscribes'> {
  liveData: Record<SokiClientSubData, unknown> = {};

  subscriptions: Record<SokiSubscribtionName, SubscribeCapsule> = {
    liveData: {
      map: new Map(),
      onClientSubscribe: client => this.send({ appName: 'index', liveData: this.liveData }, client),
      onClientUnsubscribe: () => {},
    },
    statistic: {
      map: new Map(),
      onClientSubscribe: () => this.sendStatistic(),
      onClientUnsubscribe: () => this.sendStatistic(),
    },
  };

  onCapsuleConnected = Eventer.createValue<SokiCapsule>();

  statistic: SokiStatistic = {
    online: 0,
    authed: 0,
    usages: {},
    visits: [],
    pastVisits: {},
  };

  sendStatistic() {
    const subscribers = this.subscriptions.statistic.map;
    if (!subscribers.size) return;

    this.statistic.authed = 0;
    this.statistic.online = 0;
    this.statistic.usages = {};

    this.capsules.forEach(capsule => {
      this.statistic.online++;
      if (capsule.auth) this.statistic.authed++;
      else return;

      if (capsule.appName) {
        if (this.statistic.usages[capsule.appName] === undefined) this.statistic.usages[capsule.appName] = [];

        if (capsule.auth.nick)
          this.statistic.usages[capsule.appName]!.push({
            ...capsule.auth,
            nick: capsule.auth.nick,
            version: capsule.version,
            deviceId: capsule.deviceId,
            urls: capsule.urls,
            time: '',
          });
      }
    });

    subscribers.forEach((_, client) => this.send({ statistic: this.statistic, appName: 'index' }, client));
  }

  async doOnSubscribes({ client, eventBody }: SokiServerDoActionProps) {
    this.actionWithCapsule(client, capsule => {
      if (eventBody.subscribe !== undefined) {
        this.subscriptions[eventBody.subscribe].map.set(client, capsule);
        this.subscriptions[eventBody.subscribe].onClientSubscribe(client, capsule);
        capsule.subscribeData = eventBody.subscribeData;
      }

      if (eventBody.unsubscribe !== undefined) {
        this.subscriptions[eventBody.unsubscribe].onClientUnsubscribe(client);
        this.subscriptions[eventBody.unsubscribe].map.delete(client);
      }
    });

    return false;
  }
}
