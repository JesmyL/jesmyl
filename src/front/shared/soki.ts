import { currentLangiAtom } from '#basis/locale';
import { takeBaseLanguageAtom } from '#basis/state/locale';
import { tsjrpcBaseClientNext } from '#basis/tsjrpc/TsjrpcBase.client';
import { authIDB, indexDeviceEmojiAtom, indexDeviceIdAtom } from '$index/shared/state';
import md5 from 'md5';
import { makeRegExp } from 'regexpert';
import { SokiError, TsjrpcClientTool, TsjrpcFromClientEvent, TsjrpcFromServerEvent } from 'shared/api';
import { Eventer } from 'shared/utils';
import { jversion } from 'shared/values';
import { TSJRPCEvent } from 'tsjrpc';
import { environment } from './environment';

export class SokiTrip {
  private ws: WebSocket = null!;
  private isTokenSent = false;

  private requests: PRecord<
    string,
    {
      action: (event: TsjrpcFromClientEvent) => void;
      promise: Promise<unknown>;
      event: string;
    }
  > = {};

  private isOpened = false;

  onConnectionOpenEvent = Eventer.createValue<boolean>();
  onBeforeAuthorizeEvent = Eventer.createValue<void>();
  onAuthorizeEvent = Eventer.createValue<void>();
  onInvokeErrorMessageEvent = Eventer.createValue<string>();
  onTokenInvalidEvent = Eventer.createValue<void>();

  constructor() {
    this.onBeforeAuthorizeEvent.listen(() => this.sendRegistrationToken());
  }

  private sendRegistrationToken = async () => {
    try {
      await this.send({
        token: await authIDB.get.token(),
        visitInfo: {
          deviceId: indexDeviceIdAtom.get(),
          deviceEmoji: indexDeviceEmojiAtom.get(),
          version: jversion.num,
          urls: this.urls.length ? this.urls : [this.getCurrentUrl()],
          clientTm: Date.now(),
          agent: navigator.userAgent,
          langi: currentLangiAtom.get(),
          prevLangi: takeBaseLanguageAtom().get().langi,
        },
      });

      this.isTokenSent = true;
      this.urls = [];
      this.onConnectionOpenEvent.invoke(true);
      this.isOpened = true;
    } catch (error) {
      if (error === SokiError.InvalidToken) {
        this.onTokenInvalidEvent.invoke();
      }
    }
  };

  start() {
    this.ws = new WebSocket(environment.sokiLink);

    this.ws.onclose = () => {
      this.ws = new WebSocket(environment.sokiLink);
      setTimeout(() => this.start(), 500);
      this.isOpened = false;
      this.isTokenSent = false;
    };

    this.ws.onopen = this.sendRegistrationToken;

    this.ws.onmessage = async ({ data }: { data: string }) => {
      try {
        const event: TsjrpcFromServerEvent = JSON.parse(data);

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
          sendResponse: this.sendResp,
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

    if (this.ws.readyState === this.ws.OPEN) {
      this.ws.send(event);
      return;
    }

    const send = async () => {
      this.ws.send(event);
      this.ws.removeEventListener('open', send);
    };

    this.ws.addEventListener('open', send);
  }

  sendResp({ error, ...event }: TSJRPCEvent, tool?: TsjrpcClientTool | nil | void) {
    if (error) {
      this.send({ ...event, errorMessage: `${error}` }, tool);
    } else this.send(event, tool);
  }

  send = (
    event: OmitOwn<TsjrpcFromClientEvent, 'requestId'>,
    tool?: TsjrpcClientTool | nil | void,
  ): Promise<unknown> => {
    const strEvent = JSON.stringify(event);
    const requestId = md5(strEvent);

    if (this.requests[requestId] != null) {
      return this.requests[requestId].promise as never;
    }

    const fullEvent = `${strEvent.slice(0, -1)},"requestId":"${requestId}"}`;
    const withResolvers = Promise.withResolvers();

    this.requests[requestId] = {
      action: event => {
        if (event.errorMessage) withResolvers.reject(event.errorMessage);
        else withResolvers.resolve(event.invokedResult);
      },
      event: fullEvent,
      promise: withResolvers.promise,
    };

    if (this.ws.readyState === this.ws.OPEN && (this.isTokenSent || 'token' in event)) {
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
}

export const soki = new SokiTrip().start();
