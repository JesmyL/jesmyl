import { DirStorage } from 'back/complect/DirStorage';
import { FileStore } from 'back/complect/FileStore';
import { tglogger } from 'back/sides/telegram-bot/log/log-bot';
import { Langi } from 'shared/api';
import { DynLocaleKey } from 'shared/model/+locale/_DynLocaleKey';
import { LocaleBase } from 'shared/model/+locale/base';
import { LocaleDynamic } from 'shared/model/+locale/dynamic';
import { extractNumber } from 'shared/utils';
import { checkIsEq } from 'shared/utils/checkIsEq';
import { lazyInit } from 'shared/utils/lazyInit';
import { forEachObjectEntries, objectEntries } from 'shared/utils/object.utils';
import { localeBaseEn } from './base/en';
import { localeBaseKz } from './base/kz';
import { localeBaseRu } from './base/ru';
import { localeBaseUa } from './base/ua';
import { localeDynamicEn } from './dynamic/en';
import { localeDynamicKz } from './dynamic/kz';
import { localeDynamicRu } from './dynamic/ru';
import { localeDynamicUa } from './dynamic/ua';

const log = (scope: string, langi: SKey<Langi>) =>
  tglogger.log(`Изменён набор ${scope} переводов - ${localeDynamicRu[DynLocaleKey.Lang][langi]}`);

export const langLocaleDynamicFileStoragesLazy = lazyInit(async () => {
  const langLocaleDynamicDict: { [L in Langi]: LocaleDynamic<L> } = {
    [Langi.Ru]: localeDynamicRu,
    [Langi.Ua]: localeDynamicUa,
    [Langi.Kz]: localeDynamicKz,
    [Langi.En]: localeDynamicEn,
  };

  const dirStorage = new DirStorage<LocaleDynamic<Langi>, Langi, DynLocaleKey.Langi>({
    dirPath: `/locales/dynamic/`,
    idKey: DynLocaleKey.Langi,
    makeNewItem: () => ({}) as LocaleDynamic<Langi>,
  });

  for (const [langiStr, config] of objectEntries(langLocaleDynamicDict)) {
    const langi = extractNumber(langiStr);
    const savedConfig = await dirStorage.getOrCreateItem(langi, () => ({}) as never, langi);

    if (!checkIsEq(savedConfig, config)) {
      log('динамических', langi);
      dirStorage.saveItem(langi, config);
    }
  }

  return dirStorage;
});

export const langLocaleBaseFileStoragesLazy = lazyInit(() => {
  const dict = {} as { [L in Langi]: FileStore<LocaleBase<Langi>> };

  const langLocaleBaseDict: { [L in Langi]: LocaleBase<L> } = {
    [Langi.Ru]: localeBaseRu,
    [Langi.Ua]: localeBaseUa,
    [Langi.Kz]: localeBaseKz,
    [Langi.En]: localeBaseEn,
  };

  forEachObjectEntries(langLocaleBaseDict, (langi, config) => {
    const fileStorage = (dict[langi] ??= new FileStore(`/locales/base/${langi}.json`, {} as typeof config));

    if (!checkIsEq(fileStorage.getValue(), config)) {
      log('базовых', langi);
      fileStorage.setValue(config);
    }
  });

  return dict;
});
