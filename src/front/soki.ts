import * as versionNum from '../back/+version.json';
import Eventer, { EventerListeners } from '../back/complect/Eventer';
import { Executer } from '../back/complect/executer/Executer';
import { SimpleKeyValue } from '../back/complect/filer/Filer.model';
import {
  PullEventValue,
  SokiAppName,
  SokiClientEvent,
  SokiClientEventBody,
  SokiClientUpdateCortage,
  SokiServerEvent,
  SokiSubscribtionName,
} from '../back/complect/soki/soki.model';
import environment from '../back/environments/environment';
import { JStorage } from './complect/JStorage';
import mylib from './complect/my-lib/MyLib';
import { takeDeviceId } from './components/index/complect/takeDeviceId';
import indexStorage from './components/index/indexStorage';
import { appStorage } from './shared/jstorages';

const version = { ...versionNum };

export type ResponseWaiterCallback = (
  ok: ResponseWaiter['ok'],
  ko?: ResponseWaiter['ko'],
  final?: ResponseWaiter['final'],
) => void;
const info = console.info;

interface ResponseWaiter {
  requestId: string;
  isPing?: true;
  ok: (response: SokiServerEvent) => void;
  ko?: (errorMessage: string) => boolean | void;
  final?: () => void;
}

let pingTimeout: TimeOut;

export class SokiTrip {
  ws?: WebSocket;
  isConnected = false;
  authListeners: EventerListeners<boolean> = [];
  private responseWaiters: ResponseWaiter[] = [];
  private subscriptions: Partial<Record<SokiSubscribtionName, SokiClientEventBody>> = {};

  async appName() {
    return await indexStorage.getOr('currentApp', 'cm');
  }

  onClose = () => {
    Eventer.invoke(this.authListeners, false);
    this.isConnected = false;
    setTimeout(() => this.start(), 500);
  };

  onConnect = async () => {
    const date = new Date();

    this.sendForce(
      { connect: true },
      await this.appName(),
      '',
      `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}\n${navigator.userAgent}`,
    );
  };

  start() {
    this.ws = new WebSocket(`wss://${environment.dns}/websocket/`);

    this.ws.onclose = this.onClose;
    this.ws.onopen = this.onConnect;

    this.ws.onmessage = async ({ data }: { data: string }) => {
      try {
        const event: SokiServerEvent = JSON.parse(data);
        info(event);
        let waiter: ResponseWaiter | null = null;

        for (let i = this.responseWaiters.length - 1; i > -1; i--) {
          waiter = this.responseWaiters[i];

          if (waiter.requestId === event.requestId || waiter.isPing === true) {
            if (event.errorMessage) waiter.ko?.(event.errorMessage);
            else waiter.ok(event);

            waiter.final?.();
            this.responseWaiters.splice(i, 1);
          }
        }

        if ((waiter === null || waiter.requestId !== event.requestId) && event.pull) this.updatedPulledData(event.pull);

        if (event) {
          if (event.unregister) {
            this.onUnregister();
            return;
          }

          if (event.liveData !== undefined) indexStorage.set('liveData', event.liveData);

          if (event.authorized !== undefined) {
            this.isConnected = true;
            Eventer.invoke(this.authListeners, true);
            const appName = await this.appName();
            this.pullCurrentAppData(appName);
            mylib.values(this.subscriptions).forEach(body => body && this.sendForce(body, appName));
          }

          if (event.execs && event.appName) {
            const execs = event.execs;
            const appStore = appStorage[event.appName];
            const contents = mylib.clone(appStore.properties);
            Executer.executeReals(contents, event.execs.list)
              .then(fixes => {
                appStore.refreshAreas(fixes, contents);
                this.setLastUpdates(event.appName!, [null, null, execs.lastUpdate, null]);
              })
              .catch();
          }

          if (event.statistic) indexStorage.refreshAreas(['statistic'], event as never);

          if (event.download) {
            const appStore = appStorage[event.appName];
            try {
              appStore.set(event.download.key, JSON.parse(event.download.value));
            } catch (error) {
              appStore.set(event.download.key, event.download.value);
            }
          }
        }
      } catch (e) {}
    };

    return this;
  }

  onConnected(callback: (is: boolean) => void) {
    return Eventer.listen(this.authListeners, event => {
      callback(event.value);
      event.mute();
    });
  }

  setLastUpdates(appName: SokiAppName, pullCortage: SokiClientUpdateCortage) {
    indexStorage.set('updateRequisites', (prev = {}) => {
      const [indexLastUpdate, indexRulesMd5, appLastUpdate, appRulesMd5] = pullCortage;

      return {
        ...prev,
        index: [indexLastUpdate || prev.index?.[0] || 0, indexRulesMd5 || prev.index?.[1] || undefined],
        [appName]: [appLastUpdate || prev[appName]?.[0] || 0, appRulesMd5 || prev[appName]?.[1] || undefined],
      };
    });
  }

  onUnregister() {
    indexStorage.rem('auth');
    indexStorage.rem('updateRequisites');
  }

  async pullCurrentAppData(appName: SokiAppName) {
    const {
      index: [indexLastUpdate = 0, indexRulesMd5 = ''] = [],
      [appName]: [appLastUpdate = 0, appRulesMd5 = ''] = [],
    } = (await indexStorage.get('updateRequisites')) || {};

    this.send(
      {
        pullData: [indexLastUpdate, indexRulesMd5, appLastUpdate, appRulesMd5],
      },
      appName,
    ).on(event => event.pull && this.updatedPulledData(event.pull));
  }

  updatedPulledData(pull: PullEventValue) {
    const update = (pullContents: SimpleKeyValue<string, unknown>[], store: JStorage<unknown, unknown>) => {
      if (!pullContents.length) return;

      const fixes: string[] = [];
      const contents: Record<string, unknown> = {};
      pullContents.forEach(({ key, value }) => {
        contents[key] = value;
        fixes.push(key);
      });
      store.refreshAreas(fixes as never, contents);
    };
    const {
      contents: [indexContents, appContents],
      updates,
    } = pull;
    const appStore = appStorage[pull.appName];

    update(appContents, appStore);
    update(indexContents, appStorage.index);

    appContents.forEach(({ key, value }) => appStore.set(key, value));
    indexContents.forEach(({ key, value }) => indexStorage.set(key as never, value as never));
    this.setLastUpdates(pull.appName, updates);
  }

  onAppChange(appName: SokiAppName) {
    this.pullCurrentAppData(appName);
  }

  async sendForce(body: SokiClientEventBody, appName: SokiAppName, requestId?: string, browser?: string) {
    let tries = 20;

    const trySend = async () => {
      if (tries-- < 0) return;
      try {
        if (this.ws && this.ws.readyState === this.ws.OPEN) {
          const sendEvent: SokiClientEvent = {
            requestId,
            body,
            auth: await indexStorage.get('auth'),
            appName,
            deviceId: await takeDeviceId(),
            version: version.num,
            browser,
          };

          if (body.subscribe) this.subscriptions[body.subscribe] = body;
          if (body.unsubscribe) delete this.subscriptions[body.unsubscribe];

          this.ws.send(JSON.stringify(sendEvent));
        } else setTimeout(trySend, 100);
      } catch (error) {
        setTimeout(trySend, 100);
      }
    };

    trySend();
  }

  send = (body: SokiClientEventBody, appName: SokiAppName): { on: ResponseWaiterCallback } => {
    let requestId: string | und;

    Promise.resolve().then(() => {
      if (this.isConnected) this.sendForce(body, appName, requestId);
      else this.onConnected(() => this.sendForce(body, appName, requestId));
    });

    return {
      on: (ok, ko, final) => {
        requestId = '' + Date.now() + Math.random();
        this.responseWaiters.push({
          requestId,
          ok,
          ko,
          final,
          isPing: body.ping,
        });
      },
    };
  };

  ping: ResponseWaiterCallback = (ok, ko, final) => {
    clearTimeout(pingTimeout);
    pingTimeout = setTimeout(() => this.send({ ping: true }, 'index').on(ok, ko, final), 0);
  };
}

export const soki = new SokiTrip().start();
