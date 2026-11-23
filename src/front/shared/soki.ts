import { currentLangiAtom } from '#basis/locale';
import { takeBaseLanguageAtom } from '#basis/state/locale';
import { tsjrpcBaseClientNext } from '#basis/tsjrpc/TsjrpcBase.client';
import { addEventListenerPipe } from '#shared/lib/hookEffectPipe';
import { authIDB, indexDeviceEmojiAtom, indexDeviceIdAtom } from '$index/shared/state';
import md5 from 'md5';
import { SokiError, TsjrpcClientTool, TsjrpcFromClientEvent, TsjrpcFromServerEvent } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { emptyFunc, Eventer } from 'shared/utils';
import { jversion } from 'shared/values';
import { TSJRPCEvent } from 'tsjrpc';
import { environment } from './environment';

export const takeSokiVisitDeviceInfo = () => ({
  deviceEmoji: indexDeviceEmojiAtom.get(),
  agent: navigator.userAgent,
});

export class SokiTrip {
  private ws: WebSocket = null!;
  private isTokenSent = false;

  private requests: PRecord<
    string,
    {
      action: (event: TsjrpcFromClientEvent) => void;
      reject: (reason?: string) => void;
      promise: Promise<unknown>;
      event: string;
      eventHash: string;
    }
  > = {};
  private requestIdsByEventHash: PRecord<string, string> = {};

  private isOpened = false;
  private reconnectDelay = 500;

  onConnectionOpenEvent = Eventer.createValue<boolean>();
  onBeforeAuthorizeEvent = Eventer.createValue<void>();
  onAuthorizeEvent = Eventer.createValue<void>();
  onInvokeErrorMessageEvent = Eventer.createValue<string>();
  onTokenInvalidEvent = Eventer.createValue<void>();

  constructor() {
    this.onBeforeAuthorizeEvent.listen(() => this.sendRegistrationToken());
    addEventListenerPipe(window, 'online', this.checkLiveness);
  }

  private checkLiveness = () => {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.sendRegistrationToken();
      return;
    }
    if (this.ws.readyState !== WebSocket.CONNECTING) this.start();
  };

  private takeVisitInfo = () => ({
    deviceId: indexDeviceIdAtom.get(),
    ...takeSokiVisitDeviceInfo(),
    version: jversion.num,
    urls: this.urls.length ? this.urls : [this.getCurrentUrl()],
    clientTm: Date.now(),
    langi: currentLangiAtom.get(),
    prevLangi: takeBaseLanguageAtom().get()[BaseLocaleKey.Langi],
  });

  private sendRegistrationToken = async () => {
    try {
      await this.send({
        token: await authIDB.get.token(),
        stopAll: environment.isPresentationMode || undefined,
        visitInfo: this.takeVisitInfo(),
      });

      this.isTokenSent = true;
      this.urls = [];
      this.onConnectionOpenEvent.invoke(true);
      this.isOpened = true;
      this.reconnectDelay = 500;
    } catch (error) {
      if (error === SokiError.InvalidToken) {
        this.onTokenInvalidEvent.invoke();
      }
    }
  };

  /** Re-sends the visit so the server learns the device identity assigned after the first registration. */
  refreshVisit = async () => {
    if (!this.isOpened) return;
    await this.send({ token: await authIDB.get.token(), visitInfo: this.takeVisitInfo() }).catch(emptyFunc);
  };

  start() {
    if (this.ws && this.ws.readyState !== WebSocket.CLOSED) return this;

    this.ws = new WebSocket(environment.sokiLink);

    this.ws.onclose = () => {
      this.isOpened = false;
      this.isTokenSent = false;

      Object.values(this.requests).forEach(request => request?.reject('#closed'));
      this.requests = {};
      this.requestIdsByEventHash = {};

      setTimeout(() => this.start(), this.reconnectDelay);
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, 10_000);
    };

    this.ws.onopen = this.sendRegistrationToken;

    this.ws.onmessage = async ({ data }: { data: string }) => {
      try {
        const event: TsjrpcFromServerEvent = JSON.parse(data);

        const request = this.requests[event.requestId];
        if (request !== undefined) {
          console.info(event);
          if (event.errorMessage && !event.errorMessage.startsWith('#'))
            this.onInvokeErrorMessageEvent.invoke(event.errorMessage);

          this.forgetRequest(event.requestId, request.eventHash);
          request.action(event);
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
  private getCurrentUrl = () => window.location.href;

  pushCurrentUrl() {
    this.urls.push(this.getCurrentUrl());
  }

  listenOnConnectionOpenEvent = (cb: () => void) => {
    if (this.isOpened) cb();
    return this.onConnectionOpenEvent.listen(cb);
  };

  private forgetRequest = (requestId: string, eventHash: string) => {
    delete this.requests[requestId];
    if (this.requestIdsByEventHash[eventHash] === requestId) delete this.requestIdsByEventHash[eventHash];
  };

  private sendForce = (requestId: string) => {
    const event = this.requests[requestId]?.event;
    if (event == null) return;

    if (this.ws.readyState === this.ws.OPEN) {
      this.ws.send(event);
      return;
    }

    this.onConnectionOpenEvent.listenFirst(() => this.ws.send(event));
  };

  sendResp = ({ error, ...event }: TSJRPCEvent, tool?: TsjrpcClientTool | nil | void) => {
    if (error) {
      this.send({ ...event, errorMessage: `${error}` }, tool);
    } else this.send(event, tool);
  };

  send = (
    event: OmitOwn<TsjrpcFromClientEvent, 'requestId'>,
    tool?: TsjrpcClientTool | nil | void,
  ): Promise<unknown> => {
    if (event.abort != null) {
      if (this.ws.readyState === this.ws.OPEN) this.ws.send(JSON.stringify(event));
      return Promise.resolve();
    }

    const strEvent = JSON.stringify(event);
    const eventHash = md5(strEvent);
    const pendingRequestId = this.requestIdsByEventHash[eventHash];

    if (pendingRequestId != null) {
      const pendingRequest = this.requests[pendingRequestId];
      if (pendingRequest != null) return pendingRequest.promise as never;
    }

    const requestId = md5(`${strEvent}${Math.random()}`);
    const fullEvent = `${strEvent.slice(0, -1)},"requestId":"${requestId}"}`;
    const withResolvers = Promise.withResolvers();

    this.requests[requestId] = {
      action: event => {
        if (event.errorMessage) withResolvers.reject(event.errorMessage);
        else withResolvers.resolve(event.invokedResult);
      },
      reject: withResolvers.reject,
      event: fullEvent,
      eventHash,
      promise: withResolvers.promise,
    };
    this.requestIdsByEventHash[eventHash] = requestId;

    if (this.ws.readyState === this.ws.OPEN && (this.isTokenSent || 'token' in event)) {
      this.sendForce(requestId);
    } else this.onConnectionOpenEvent.listenFirst(() => this.sendForce(requestId));

    const abortRequest = (reason: string) => {
      if (this.requests[requestId] == null) return;

      withResolvers.reject(reason);
      this.forgetRequest(requestId, eventHash);
      this.send({ abort: requestId });
    };

    if (tool?.timeout != null) setTimeout(() => abortRequest('#aborted by timeout'), tool.timeout);

    if (tool?.aborter != null) {
      const aborter = tool.aborter;
      const removeListener = () => aborter.signal.removeEventListener('abort', onAbort);
      const onAbort = () => {
        removeListener();
        abortRequest('#aborted');
      };

      withResolvers.promise.then(removeListener).catch(removeListener);
      aborter.signal.addEventListener('abort', onAbort);
    }

    return withResolvers.promise;
  };
}

export const soki = new SokiTrip().start();
