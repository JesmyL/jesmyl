import { FileStore } from 'back/complect/FileStore';
import { objectLength } from 'shared/utils/object.utils';
import { EmailerAuthConfigDict } from './model';

export const emailerConfigFileStorage = new FileStore<EmailerAuthConfigDict>('/emailerAuthConfigDict', {});

if (!objectLength(emailerConfigFileStorage.getValue())) {
  throw 'need to init 7341623565123';
}
