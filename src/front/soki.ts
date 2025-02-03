import { environment, InvocatorClientEvent, InvocatorServerEvent } from 'shared/api';
import { Eventer, makeRegExp } from 'shared/utils';
import { authIDB } from './components/index/db/auth-idb';
import { indexIDB } from './components/index/db/index-idb';
import { onSokiClientEventerInvocatorInvoke } from './eventers';

export class SokiTrip {
  private ws?: WebSocket;

  private isConnected = false;
  private connectionState = Eventer.createValue<boolean>();
  private requests = {} as Record<string, (event: InvocatorClientEvent) => void>;

  private isOpened = false;
  private onOpenEvent = Eventer.createValue<boolean>();

  private setIsConnected(value: boolean) {
    this.isConnected = value;
    this.connectionState.invoke(value);
  }

  onTokenInvalidEvent = Eventer.createValue<void>();
  onConnectionState = (cb: (is: boolean) => void) => this.connectionState.listen(cb, this.isConnected);

  start() {
    this.ws = new WebSocket(`wss://${environment.dns}/websocket/`);

    this.ws.onclose = () => {
      setTimeout(() => this.start(), 500);
      this.isOpened = false;
    };

    this.ws.onopen = async () => {
      try {
        await this.send({
          token: await authIDB.get.token(),
          visit: {
            deviceId: await indexIDB.get.deviceId(),
            version: await indexIDB.get.appVersion(),
            urls: this.urls.length ? this.urls : [this.getCurrentUrl()],
            clientTm: Date.now(),
          },
        });

        this.urls = [];
        this.onOpenEvent.invoke(true);
        this.isOpened = true;
      } catch (errorMessage) {
        if (errorMessage === '#invalid_token') {
          authIDB.remove.auth();
          authIDB.remove.token();

          this.onTokenInvalidEvent.invoke();
        }
      }
    };

    this.ws.onmessage = async ({ data }: { data: string }) => {
      try {
        const event: InvocatorServerEvent = JSON.parse(data);

        if (event.pong) {
          this.setIsConnected(true);
          clearTimeout(this.pingDisconnectedSetterTimeout);
          return;
        }

        console.info(event);

        this.requests[event.requestId]?.(event);
        delete this.requests[event.requestId];

        if (event.invoke === undefined) return;

        onSokiClientEventerInvocatorInvoke.invoke({
          invoke: event.invoke,
          sendResponse: this.send,
          tool: undefined,
          requestId: event.requestId,
        });
      } catch (e) {}
    };

    return this;
  }

  private urls: string[] = [];
  private getCurrentUrl = () => window.location.href.replace(makeRegExp('/^https?:/'), 'https:');

  pushCurrentUrl() {
    this.urls.push(this.getCurrentUrl());
  }

  listenOnOpenEvent = (cb: () => void) => {
    if (this.isOpened) cb();
    this.onOpenEvent.listen(cb);
  };

  private async sendForce(event: InvocatorClientEvent) {
    let tries = 20;

    const trySend = async () => {
      if (tries-- < 0) return;
      try {
        if (this.ws && this.ws.readyState === this.ws.OPEN) {
          this.ws.send(JSON.stringify(event));
        } else setTimeout(trySend, 100);
      } catch (error) {
        setTimeout(trySend, 100);
      }
    };

    trySend();
  }

  send = <InvokedResult = unknown>(event: OmitOwn<InvocatorClientEvent, 'requestId'>) => {
    const requestId = '' + Date.now() + Math.random();
    const fullEvent = { ...event, requestId };

    if (this.ws && this.ws.readyState === this.ws.OPEN) this.sendForce(fullEvent);
    else this.onOpenEvent.listenFirst(() => this.sendForce(fullEvent));

    const result = Promise.withResolvers<InvokedResult>();

    this.requests[requestId] = event => {
      if (event.errorMessage) result.reject(event.errorMessage);
      else result.resolve(event.invokedResult as never);
    };

    return result.promise;
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
      this.send({ ping: 1 });
      this.pingTimeout = undefined;
    }, 0);
  };
}

export const soki = new SokiTrip().start();
