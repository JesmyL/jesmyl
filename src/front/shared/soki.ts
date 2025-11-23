import { tsjrpcBaseClientNext } from '#basis/tsjrpc/TsjrpcBase.client';
import { authIDB, indexDeviceIdAtom } from '$index/shared/state';
import { makeRegExp } from 'regexpert';
import { SokiError, TsjrpcClientEvent, TsjrpcClientTool, TsjrpcServerEvent } from 'shared/api';
import { Eventer, smylib } from 'shared/utils';
import { jversion } from 'shared/values';
import { environment } from './environment';

export class SokiTrip {
  private ws?: WebSocket;
  private isTokenSent = false;

  private isConnected = false;
  private connectionState = Eventer.createValue<boolean>();
  private requests: PRecord<
    string,
    {
      action: (event: TsjrpcClientEvent) => void;
      promise: Promise<unknown>;
      event: string;
    }
  > = {};

  private isOpened = false;

  private setIsConnected(value: boolean) {
    this.isConnected = value;
    this.connectionState.invoke(value);
  }

  onConnectionOpenEvent = Eventer.createValue<boolean>();
  onBeforeAuthorizeEvent = Eventer.createValue<void>();
  onAuthorizeEvent = Eventer.createValue<void>();
  onInvokeErrorMessageEvent = Eventer.createValue<string>();
  onTokenInvalidEvent = Eventer.createValue<void>();
  onConnectionState = (cb: (is: boolean) => void) => this.connectionState.listen(cb, this.isConnected);

  constructor() {
    this.onBeforeAuthorizeEvent.listen(() => this.sendRegistrationToken());
  }

  private sendRegistrationToken = async () => {
    try {
      let location: object | null = null;

      try {
        const aborter = new AbortController();
        setTimeout(() => aborter.abort(), 5000);
        location = await (await fetch('https://api.db-ip.com/v2/free/self', aborter)).json();
      } catch (_e) {
        //
      }

      await this.send({
        token: await authIDB.get.token(),
        visitInfo: {
          deviceId: indexDeviceIdAtom.get(),
          version: jversion.num,
          urls: this.urls.length ? this.urls : [this.getCurrentUrl()],
          clientTm: Date.now(),
          location,
        },
      });

      this.isTokenSent = true;
      this.urls = [];
      this.onConnectionOpenEvent.invoke(true);
      this.isOpened = true;
    } catch (errorMessage) {
      if (errorMessage === SokiError.InvalidToken) {
        this.onTokenInvalidEvent.invoke();
      }
    }
  };

  start() {
    this.ws = new WebSocket(environment.sokiLink);

    this.ws.onclose = () => {
      setTimeout(() => this.start(), 500);
      this.isOpened = false;
      this.isTokenSent = false;
    };

    this.ws.onopen = this.sendRegistrationToken;

    this.ws.onmessage = async ({ data }: { data: string }) => {
      try {
        const event: TsjrpcServerEvent = JSON.parse(data);

        if (event.pong) {
          this.setIsConnected(true);
          clearTimeout(this.pingDisconnectedSetterTimeout);
          return;
        }

        if (this.requests[event.requestId] !== undefined) {
          console.info(event);
          if (event.errorMessage && !event.errorMessage.startsWith('#'))
            this.onInvokeErrorMessageEvent.invoke(event.errorMessage);

          this.requests[event.requestId]!.action(event);
          delete this.requests[event.requestId];
        }

        if (event.invoke === undefined) return;

        tsjrpcBaseClientNext({
          invoke: event.invoke,
          sendResponse: this.send,
          tool: undefined,
          requestId: event.requestId,
        });
      } catch (_error) {
        //
      }
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

  private async sendForce(requestId: string) {
    const event = this.requests[requestId]?.event;
    if (event == null) return;
    let tries = 20;

    const trySend = async () => {
      if (tries-- < 0) return;
      try {
        if (this.ws && this.ws.readyState === this.ws.OPEN) {
          this.ws.send(event);
        } else setTimeout(trySend, 100);
      } catch (_error) {
        setTimeout(trySend, 100);
      }
    };

    trySend();
  }

  send = <InvokedResult = unknown>(
    event: OmitOwn<TsjrpcClientEvent, 'requestId'>,
    tool?: TsjrpcClientTool | nil | void,
  ) => {
    const strEvent = JSON.stringify(event);
    const requestId = smylib.md5(strEvent);

    if (this.requests[requestId] != null) {
      return this.requests[requestId].promise;
    }

    const fullEvent = `${strEvent.slice(0, -1)},"requestId":"${requestId}"}`;
    const withResolvers = Promise.withResolvers<InvokedResult>();

    this.requests[requestId] = {
      action: event => {
        if (event.errorMessage) withResolvers.reject(event.errorMessage);
        else withResolvers.resolve(event.invokedResult as never);
      },
      event: fullEvent,
      promise: withResolvers.promise,
    };

    if (this.ws && this.ws.readyState === this.ws.OPEN && (this.isTokenSent || 'token' in event)) {
      this.sendForce(requestId);
    } else this.onConnectionOpenEvent.listenFirst(() => this.sendForce(requestId));

    if (tool?.aborter != null) {
      const aborter = tool.aborter;
      const removeListener = () => aborter.signal.removeEventListener('abort', onAbort);
      let reason = '#aborted';

      const onAbort = () => {
        removeListener();
        withResolvers.reject(reason);
        delete this.requests[requestId];
        this.send({ abort: requestId });
      };

      if (tool.timeout != null)
        setTimeout(() => {
          reason = '#aborted by timout';
          onAbort();
        }, tool.timeout);

      withResolvers.promise.then(removeListener).catch(removeListener);
      aborter.signal.addEventListener('abort', onAbort);
    }

    return withResolvers.promise;
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
