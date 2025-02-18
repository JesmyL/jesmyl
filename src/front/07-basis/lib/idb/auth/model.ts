import { LocalSokiAuth } from 'shared/api';

export interface AuthIDBStore {
  auth: LocalSokiAuth;
  token: string | null;
}
