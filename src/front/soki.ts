import { environment, InvocatorEvent } from 'shared/api';
import { emptyFunc, Eventer, makeRegExp } from 'shared/utils';
import { onSokiClientEventerInvocatorInvoke } from './eventers';

export type ResponseWaiterCallback = (
  ok: ResponseWaiter['ok'],
  ko?: ResponseWaiter['ko'],
  final?: ResponseWaiter['final'],
) => void;
const info = console.info;

interface ResponseWaiter {
  requestId: string;
  ok: (response: InvocatorEvent) => void;
  ko?: (errorMessage: string) => boolean | void;
  final?: () => void;
}

export class SokiTrip {
  private ws?: WebSocket;

  private isConnected = false;
  private connectionState = Eventer.createValue<boolean>();
  private requests = {} as Record<string, (event: InvocatorEvent) => void>;

  private isOpened = false;
  private onOpenEvent = Eventer.createValue<boolean>();

  setIsConnected(value: boolean) {
    this.isConnected = value;
    this.connectionState.invoke(value);
  }

  onConnectionState(cb: (is: boolean) => void) {
    return this.connectionState.listen(cb, this.isConnected);
  }

  start() {
    this.ws = new WebSocket(`wss://${environment.dns}/websocket/`);

    this.ws.onclose = () => {
      setTimeout(() => this.start(), 500);
      this.isOpened = false;
    };
    this.ws.onopen = () => {
      this.onOpenEvent.invoke(true);
      this.isOpened = true;
    };

    this.ws.onmessage = async ({ data }: { data: string }) => {
      try {
        const event: InvocatorEvent = JSON.parse(data);

        if (event.pong) {
          this.setIsConnected(true);
          clearTimeout(this.pingDisconnectedSetterTimeout);
          return;
        }

        info(event);

        this.requests[event.requestId]?.(event);
        delete this.requests[event.requestId];

        if (event.invoke != null) {
          onSokiClientEventerInvocatorInvoke.invoke({
            invoke: event.invoke,
            sendResponse: event => this.send(event, emptyFunc),
            tool: undefined,
            requestId: event.requestId,
          });
        }
      } catch (e) {}
    };

    return this;
  }

  getCurrentUrl() {
    return window.location.href.replace(makeRegExp('/^https?:/'), 'https:');
  }
  urls: string[] = [];

  addUrl() {
    this.urls.push(this.getCurrentUrl());
  }

  listenOnOpenEvent(cb: () => void) {
    if (this.isOpened) cb();
    return this.onOpenEvent.listen(cb);
  }

  private async sendForce(event: InvocatorEvent) {
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

  send = (event: OmitOwn<InvocatorEvent, 'requestId'>, cb: (event: InvocatorEvent) => void) => {
    const requestId = '' + Date.now() + Math.random();
    const fullEvent = { ...event, requestId };

    this.requests[requestId] = cb;

    if (this.ws && this.ws.readyState === this.ws.OPEN) this.sendForce(fullEvent);
    else this.onOpenEvent.listenFirst(() => this.sendForce(fullEvent));
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
      this.send({ ping: 1 }, emptyFunc);
      this.pingTimeout = undefined;
    }, 0);
  };
}

export const soki = new SokiTrip().start();
