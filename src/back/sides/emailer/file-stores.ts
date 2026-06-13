import { FileStore } from 'back/complect/FileStore';
import { EmailerAuthConfigDict } from './model';

export const emailerConfigFileStorage = new FileStore<EmailerAuthConfigDict>('/emailerAuthConfigDict', {});
