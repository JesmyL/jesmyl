import { randomBytes } from 'crypto';
import { Do } from 'shared/enums';
import { FileStore } from '../FileStore';

export const tokenSecretFileStore = new FileStore<{ token: string }>('/.tokenSecret', { token: '' });

if (!tokenSecretFileStore.getValue().token) {
  throw 'need to init 918263655416215';
} else if (!Do.It) {
  tokenSecretFileStore.setValue({ token: randomBytes(60).toString('hex') });
}
