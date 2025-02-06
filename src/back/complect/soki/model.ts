import { LocalSokiAuth, SokiAuthLogin } from 'shared/api';
import { WebSocket } from 'ws';

export type SokiServerClientSelector =
  | WebSocket
  | null
  | ((client: WebSocket, auth: LocalSokiAuth | und) => boolean)
  | { login: SokiAuthLogin; ignoreClient?: WebSocket };
