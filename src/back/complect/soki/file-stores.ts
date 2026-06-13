import { FileStore } from '../FileStore';

export const tokenSecretFileStore = new FileStore<{ token: string }>('/.tokenSecret', { token: '' });
