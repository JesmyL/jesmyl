import { FileStore } from '../FileStore';

export const tokenSecretFileStore = new FileStore<{ token: string }>('/.tokenSecret', { token: '' });
// tokenSecretFileStore.setValue({ token: randomBytes(60).toString('hex') });
