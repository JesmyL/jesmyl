import { environment } from '#shared/environment';
import { DexieDB } from '#shared/lib/DexieDB';
import { LocalSokiAuth } from 'shared/api';

interface Storage {
  auth: LocalSokiAuth;
  token: string | null;
}

class AuthIDB extends DexieDB<Storage> {
  constructor() {
    super(environment.authIDBStoreName, {
      auth: [{}],
      token: [null],
    });
  }
}

export const authIDB = new AuthIDB();
