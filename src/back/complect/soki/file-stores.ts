import { makeRedLogText } from 'back/utils.exec';
import { randomBytes } from 'crypto';
import { Do } from 'shared/enums';
import { FileStore } from '../FileStore';

export const tokenSecretFileStore = new FileStore<{ token: string }>('/.tokenSecret', { token: '' });

if (!Do.It) {
  tokenSecretFileStore.setValue({ token: randomBytes(60).toString('hex') });
} else if (!tokenSecretFileStore.getValue().token) {
  console.error(makeRedLogText('need init value 712351434143'));
  throw '';
}
