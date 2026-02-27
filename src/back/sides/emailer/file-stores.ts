import { FileStore } from 'back/complect/FileStore';
import { EmailerAuthConfigDict } from './model';

export const emailerConfigFileStorage = new FileStore<EmailerAuthConfigDict>('/emailerAuthConfigDict', {});

// // generate password in https://id.yandex.ru/security/app-passwords
// emailerConfigFileStorage.setValue(prev => ({
//   ...prev,
// }));
