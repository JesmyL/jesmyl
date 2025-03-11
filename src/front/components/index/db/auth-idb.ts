import { DexieDB } from '#shared/lib/DexieDB';
import { LocalSokiAuth } from 'shared/api';

interface Storage {
  auth: LocalSokiAuth;
  token: string | null;
}

const storeName = process.env.NODE_ENV === 'development' ? 'authorization?' : 'authorization';

class AuthIDB extends DexieDB<Storage> {
  constructor() {
    super(storeName, {
      auth: { $byDefault: { level: 0 } },
      token: { $byDefault: null },
    });
  }
}

export const authIDB = new AuthIDB();
