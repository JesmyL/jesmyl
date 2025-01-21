import { MyLib } from 'front/utils';
import {
  DeviceId,
  environment,
  ServerStoreContent,
  SokiAppName,
  sokiAppNamesSet,
  SokiClientEvent,
  SokiClientEventBody,
  SokiInvokerEvent,
  SokiServerEvent,
} from 'shared/api';
import { Eventer, makeRegExp } from 'shared/utils';
import { jversion } from 'shared/values';
import { AppName } from './app/App.model';
import { Molecule } from './complect/atoms';
import { lsJStorageLSSwitcherName } from './complect/JStorage';
import { bibleMolecule } from './components/apps/bible/molecules';
import { cmMolecule } from './components/apps/cm/molecules';
import { wedMolecule } from './components/apps/wedding/molecules';
import { getAuthValue } from './components/index/atoms';
import { onSokiClientEventerInvocatorInvoke } from './eventers';

export type ResponseWaiterCallback = (
  ok: ResponseWaiter['ok'],
  ko?: ResponseWaiter['ko'],
  final?: ResponseWaiter['final'],
) => void;
const info = console.info;

interface ResponseWaiter {
  requestId: string;
  ok: (response: SokiServerEvent) => void;
  ko?: (errorMessage: string) => boolean | void;
  final?: () => void;
}

export class SokiTrip {
  private ws?: WebSocket;

  private isConnected = false;
  private connectionState = Eventer.createValue<boolean>();

  private onServerEvent = Eventer.createValue<SokiServerEvent>();
  private onClientEvent = Eventer.createValue<SokiClientEvent>();
  private onAuthorized = Eventer.createValue<boolean>();

  private responseWaiters: ResponseWaiter[] = [];

  private molecules: Partial<{ [Key in AppName]: Molecule<any, Key> }> = {
    cm: cmMolecule,
    bible: bibleMolecule,
    wed: wedMolecule,
  };

  constructor() {
    (async () => {
      if (!(await getAuthValue())?.level) return;

      MyLib.values(this.molecules).forEach(
        molecule =>
          molecule &&
          (molecule.onServerStorageValueSend = (serverUserContents, appName) =>
            this.send({ serverUserContents }, appName)),
      );
    })();
  }

  setIsConnected(value: boolean) {
    this.isConnected = value;
    this.connectionState.invoke(value);
  }

  onConnectionState(cb: (is: boolean) => void) {
    return this.connectionState.listen(cb, this.isConnected);
  }

  appName() {
    const parts = window.location.pathname.split('/', 2);
    const appName = (parts[0] || parts[1]) as SokiAppName | '';
    if (appName !== '' && sokiAppNamesSet.has(appName)) return appName;

    return 'index';
  }

  onClose = () => {
    this.onAuthorized.invoke(false);
    this.setIsConnected(false);
    setTimeout(() => this.start(), 500);
  };

  onEventServerListen(appName: AppName | '*', cb: (event: SokiServerEvent) => void) {
    return this.onServerEvent.listen(
      appName === '*'
        ? cb
        : event => {
            if (event.appName !== appName) return;
            cb(event);
          },
    );
  }

  onEventClientListen(appName: AppName | '*', cb: (event: SokiClientEvent) => void) {
    return this.onClientEvent.listen(
      appName === '*'
        ? cb
        : event => {
            if (event.appName !== appName) return;
            cb(event);
          },
    );
  }

  sendConnectionHandshake = async () => {
    const date = new Date();

    this.sendForce(
      { connect: true },
      this.appName(),
      '',
      `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}\n${navigator.userAgent}`,
    );
  };

  serverEventAppExecs(
    setterBox: { set(fix: string, content: unknown): void; getValues(): object },
    event: SokiServerEvent,
  ) {
    const appName = event.appName;

    if (appName === 'external') return;
  }

  serverEventAppActions(
    setterBox: {
      set(fix: string, content: unknown): void;
      saveFreshContents(freshUserContents?: ServerStoreContent[]): void;
      collectFreshServerStoreContents(ts: number): ServerStoreContent[] | und;
    },
    event: SokiServerEvent,
  ) {
    const appName = event.appName;

    if (appName === 'external') return;

    if (event.download) {
      try {
        setterBox.set(event.download.key, JSON.parse(event.download.value));
      } catch (error) {
        setterBox.set(event.download.key, event.download.value);
      }
    }

    if (event.freshUserContents) {
      setterBox.saveFreshContents(event.freshUserContents);
    }

    if (event.pullFreshUserContentsByTs !== undefined) {
      const serverUserContents = setterBox.collectFreshServerStoreContents(event.pullFreshUserContentsByTs);
      if (serverUserContents?.length) this.send({ serverUserContents }, appName);
    }
  }

  start() {
    this.ws = new WebSocket(`wss://${environment.dns}/websocket/`);

    this.ws.onclose = this.onClose;
    this.ws.onopen = this.sendConnectionHandshake;

    this.ws.onmessage = async ({ data }: { data: string }) => {
      try {
        const event: SokiServerEvent = JSON.parse(data);

        if (event.pong) {
          this.setIsConnected(true);
          clearTimeout(this.pingDisconnectedSetterTimeout);
          return;
        }

        this.onServerEvent.invoke(event);
        info(event);
        let waiter: ResponseWaiter | null = null;

        for (let i = this.responseWaiters.length - 1; i > -1; i--) {
          waiter = this.responseWaiters[i];

          if (waiter.requestId === event.requestId) {
            if (event.errorMessage) waiter.ko?.(event.errorMessage);
            else waiter.ok(event);

            waiter.final?.();
            this.responseWaiters.splice(i, 1);
          }
        }

        if (event.invoke != null) {
          onSokiClientEventerInvocatorInvoke.invoke({
            invoke: event.invoke,
            send: this.invokeSend,
            tool: undefined,
          });
        }
      } catch (e) {}
    };

    return this;
  }

  private invokeSend = (event: SokiInvokerEvent) => this.send(event, 'index');

  getCurrentUrl() {
    return window.location.href.replace(makeRegExp('/^https?:/'), 'https:');
  }
  urls: string[] = [];

  addUrl() {
    this.urls.push(this.getCurrentUrl());
  }

  async sendForce(body: SokiClientEventBody, appName: SokiAppName | null, requestId?: string, browser?: string) {
    if (appName === null) return;
    let tries = 20;

    const trySend = async () => {
      if (tries-- < 0) return;
      try {
        const auth = await getAuthValue();

        if (this.ws && this.ws.readyState === this.ws.OPEN) {
          const sendEvent: SokiClientEvent = {
            requestId,
            body,
            auth: auth?.level === 0 ? undefined : auth,
            appName,
            deviceId: DeviceId.def,
            version: jversion.num,
            browser,
            urls: this.urls.length ? this.urls : [this.getCurrentUrl()],
            isUseLS: localStorage[lsJStorageLSSwitcherName] ? true : undefined,
          };

          this.onClientEvent.invoke(sendEvent);
          this.ws.send(JSON.stringify(sendEvent));

          this.urls = [this.getCurrentUrl()];
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
      else this.onAuthorized.listenFirst(() => this.sendForce(body, appName, requestId));
    });

    return {
      on: (ok, ko, final) => {
        requestId = '' + Date.now() + Math.random();
        this.responseWaiters.push({
          requestId,
          ok,
          ko,
          final,
        });
      },
    };
  };

  private pingTimeout: TimeOut;
  private pingDisconnectedSetterTimeout: TimeOut;
  ping = () => {
    if (this.pingTimeout === undefined) {
      clearTimeout(this.pingDisconnectedSetterTimeout);
      this.pingDisconnectedSetterTimeout = setTimeout(() => this.setIsConnected(false), 500);
    }

    clearTimeout(this.pingTimeout);
    this.pingTimeout = setTimeout(() => {
      this.ws?.send(JSON.stringify({ ping: true }));
      this.pingTimeout = undefined;
    }, 0);
  };
}

export const soki = new SokiTrip().start();
