import { Langi } from 'shared/api';
import { localeRemoteEn } from './en';
import { localeRemoteKz } from './kz';
import { localeRemoteRu } from './ru';
import { localeRemoteUa } from './ua';

const remoteLocaleDicts: Record<Langi, Record<number, string>> = {
  [Langi.Ru]: localeRemoteRu,
  [Langi.Ua]: localeRemoteUa,
  [Langi.Kz]: localeRemoteKz,
  [Langi.En]: localeRemoteEn,
};

export const takeRemoteLocaleDict = (langi: Langi) => remoteLocaleDicts[langi] ?? remoteLocaleDicts[Langi.Ru];
