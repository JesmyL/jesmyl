import { FileStore } from 'back/complect/FileStore';
import { Do } from 'shared/enums';

export const tgBotConfig = new FileStore('/.tgBotEnv', { token: '' });

if (!Do.It) tgBotConfig.setValue({ token: '' });
