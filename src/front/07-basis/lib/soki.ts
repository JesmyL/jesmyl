import { InvocatorClientEvent, InvocatorServerEvent } from 'shared/api';
import { Eventer, makeRegExp } from 'shared/utils';
import { environment } from '../../environments';
import { onSokiClientEventerInvocatorInvoke } from '../../eventers';
import { authIDB } from './idb/auth';
import { indexIDB } from './idb/index/index';

export class SokiTrip {
  private ws?: WebSocket;

  private isConnected = false;
  private connectionState = Eventer.createValue<boolean>();
  private requests = {} as Record<string, (event: InvocatorClientEvent) => void>;

  private isOpened = false;

  private setIsConnected(value: boolean) {
    this.isConnected = value;
    this.connectionState.invoke(value);
  }

  onConnectionOpenEvent = Eventer.createValue<boolean>();
  onBeforeAuthorizeEvent = Eventer.createValue<void>();
  onAuthorizeEvent = Eventer.createValue<void>();
  onTokenInvalidEvent = Eventer.createValue<void>();
  onConnectionState = (cb: (is: boolean) => void) => this.connectionState.listen(cb, this.isConnected);

  constructor() {
    this.onBeforeAuthorizeEvent.listen(() => this.sendRegistrationToken());
  }

  private sendRegistrationToken = async () => {
    try {
      let location: {} | null = null;

      try {
        const aborter = new AbortController();
        setTimeout(() => aborter.abort(), 5000);
        location = await (await fetch('https://api.db-ip.com/v2/free/self', aborter)).json();
      } catch (e) {}

      await this.send({
        token: await authIDB.get.token(),
        visit: {
          deviceId: await indexIDB.get.deviceId(),
          version: await indexIDB.get.appVersion(),
          urls: this.urls.length ? this.urls : [this.getCurrentUrl()],
          clientTm: Date.now(),
          location,
        },
      });

      this.urls = [];
      this.onConnectionOpenEvent.invoke(true);
      this.isOpened = true;
    } catch (errorMessage) {
      if (errorMessage === '#invalid_token') {
        authIDB.remove.auth();
        authIDB.remove.token();

        this.onTokenInvalidEvent.invoke();
      }
    }
  };

  start() {
    this.ws = new WebSocket(environment.sokiLink);

    this.ws.onclose = () => {
      setTimeout(() => this.start(), 500);
      this.isOpened = false;
    };

    this.ws.onopen = this.sendRegistrationToken;

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

  listenOnConnectionOpenEvent = (cb: () => void) => {
    if (this.isOpened) cb();
    this.onConnectionOpenEvent.listen(cb);
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
    else this.onConnectionOpenEvent.listenFirst(() => this.sendForce(fullEvent));

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
