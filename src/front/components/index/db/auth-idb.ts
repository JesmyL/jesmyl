import { DexieDB } from '#shared/lib/DexieDB';
import { environment } from 'front/environment';
import { LocalSokiAuth } from 'shared/api';

interface Storage {
  auth: LocalSokiAuth;
  token: string | null;
}

const storeName =
  environment.isTest || new URL(window.location.href).hostname === 'localhost' ? 'authorization' : 'authorization';

class AuthIDB extends DexieDB<Storage> {
  constructor() {
    super(storeName, {
      auth: { $byDefault: { level: 0 } },
      token: { $byDefault: null },
    });
  }
}

export const authIDB = new AuthIDB();
