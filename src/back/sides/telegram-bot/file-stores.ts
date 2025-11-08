import { FileStore } from 'back/complect/FileStore';

export const tgBotConfig = new FileStore('/.tgBotEnv', { token: '' });
// tgBotConfig.setValue({ token: '' });
