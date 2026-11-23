import { langLocaleBaseFileStoragesLazy } from 'back/locales/file-storages';
import { Langi } from 'shared/api';

export const takeFreshBaseLocalePayload = (langi: Langi, lastModifiedAt: number, isLangiChanged = false) => {
  const baseFileStorage = langLocaleBaseFileStoragesLazy()[langi];
  const mod = baseFileStorage.fileModifiedAt();

  if (mod > lastModifiedAt || isLangiChanged) return { base: baseFileStorage.getValue(), mod };

  return null;
};
