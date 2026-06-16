declare global {
  function setTimeoutEffect<Args extends unknown[]>(
    handler: (...args: Args) => void,
    timeout?: number,
    ...args: Args
  ): () => void;

  interface OnMessageEvent extends OmitOwn<Event, 'currentTarget' | 'target' | 'srcElement'> {
    data: string;
    origin: '';
    lastEventId: '';
    source: null;
    ports: [];
    userActivation: null;
    type: 'message';
    currentTarget: PresentationConnection;
    srcElement: PresentationConnection;
    target: PresentationConnection;
  }

  interface PresentationConnection {
    binaryType: 'arraybuffer';
    id: string;
    onclose: null | ((event: Event) => void);
    onconnect: null | ((event: Event) => void);
    onmessage: null | ((event: OnMessageEvent) => void);
    onterminate: null | ((event: Event) => void);
    state: string | 'connected';
    url: string;
    send(text: string): void;
    terminate(): void;
    close(): void;
  }

  class PresentationRequest extends EventTarget {
    constructor(localUrl: string);

    getAvailability(): void;
    onconnectionavailable: null | ((event: unknown) => void);
    reconnect(): void;
    start(): Promise<PresentationConnection>;
  }

  interface PresentationConnectionList extends EventTarget {
    connections: PresentationConnection[];
    connectionavailable(event: unknown): void;
  }

  class PresentationReceiver {
    connectionList: Promise<PresentationConnectionList>;
  }

  interface Presentation {
    defaultRequest: null;
    receiver: PresentationReceiver;
  }

  interface Navigator {
    presentation: Presentation;
  }
}

export {};
