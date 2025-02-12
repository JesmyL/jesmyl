import { LocalSokiAuth, SokiAuthLogin } from 'shared/api';
import { WebSocket } from 'ws';

export type SokiServerClientSelector =
  | WebSocket
  | WebSocket[]
  | MapIterator<WebSocket>
  | SetIterator<WebSocket>
  | Set<WebSocket>
  | Map<unknown, WebSocket>
  | null
  | ((client: WebSocket, auth: LocalSokiAuth | und) => boolean)
  | { login: SokiAuthLogin; ignoreClient?: WebSocket };
