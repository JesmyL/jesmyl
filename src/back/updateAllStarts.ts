import { randomBytes } from 'crypto';
import { Do } from 'shared/enums';
import { stameskaIconPack } from 'stameska-icon/pack';
import { indexStameskaIconsFileStore, valuesFileStore } from './apps/index/file-stores';
import { tokenSecretFileStore } from './complect/soki/file-stores';
import { emailerConfigFileStorage } from './sides/emailer/file-stores';
import { tgBotConfig } from './sides/telegram-bot/file-stores';

export const updateAllStarts = () => {
  if (!Do.It)
    if (indexStameskaIconsFileStore.getValue() == null) indexStameskaIconsFileStore.setValue(stameskaIconPack);

  if (!Do.It)
    valuesFileStore.setValue(prev => ({
      ...prev,
      // chatUrl: '',
      // iconSearchLink: '',
      // desktopLinuxDownLink: `${hostConfig.url}/down/JESMYL_PRO.AppImage`,
      // desktopWindowsDownLink: `${hostConfig.url}/down/JESMYL_PRO.exe`,
    }));

  if (!Do.It) tokenSecretFileStore.setValue({ token: randomBytes(60).toString('hex') });

  // generate password in https://id.yandex.ru/security/app-passwords
  // Некоторые хостинги блокируют 465 порт! Нужно разблочить!!!
  if (!Do.It)
    emailerConfigFileStorage.setValue(prev => ({
      ...prev,
    }));

  if (!Do.It) tgBotConfig.setValue({ token: '' });
};
