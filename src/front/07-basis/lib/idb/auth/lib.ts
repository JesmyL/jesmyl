import { DexieDB } from 'front/08-shared/lib/_DexieDB';
import { AuthIDBStore } from './model';

const storeName = process.env.NODE_ENV === 'development' ? 'authorization' : 'authorization';

class AuthIDB extends DexieDB<AuthIDBStore> {
  constructor() {
    super(storeName, {
      auth: { $byDefault: { level: 0 } },
      token: { $byDefault: null },
    });
  }
}

export const authIDB = new AuthIDB();
