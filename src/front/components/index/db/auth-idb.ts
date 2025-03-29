import { DexieDB } from '#shared/lib/DexieDB';
import { environment } from 'front/environment';
import { LocalSokiAuth } from 'shared/api';

interface Storage {
  auth: LocalSokiAuth;
  token: string | null;
}

class AuthIDB extends DexieDB<Storage> {
  constructor() {
    super(environment.authIDBStoreName, {
      auth: { $byDefault: { level: 0 } },
      token: { $byDefault: null },
    });
  }
}

export const authIDB = new AuthIDB();
