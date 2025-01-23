import { SokiCapsule, sokiWhenRejButTs } from 'shared/api';
import { WebSocket } from 'ws';

export type SokiServerClientSelector =
  | WebSocket
  | null
  | ((
      capsule: SokiCapsule,
      client: WebSocket,
      whenRejButTs: typeof sokiWhenRejButTs,
    ) => boolean | typeof sokiWhenRejButTs);
