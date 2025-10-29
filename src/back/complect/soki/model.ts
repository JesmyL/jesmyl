import { LocalSokiAuth, SokiAuthLogin, SokiVisit } from 'shared/api';
import { WebSocket } from 'ws';

export type SokiServerClientSelector =
  | WebSocket
  | WebSocket[]
  | MapIterator<WebSocket>
  | SetIterator<WebSocket>
  | Set<WebSocket>
  | Map<unknown, WebSocket>
  | null
  | ((visit: SokiVisit | nil, auth: LocalSokiAuth | nil, client: WebSocket) => boolean)
  | { login: SokiAuthLogin; ignoreClient?: WebSocket }
  | { logins: SokiAuthLogin[] };
