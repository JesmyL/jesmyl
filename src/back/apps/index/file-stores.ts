import { FileStore } from 'back/complect/FileStore';
import { NounPronsType } from 'back/complect/model';
import { DeviceId, Langi, LocalSokiAuth } from 'shared/api';
import { IndexAppAccessRightTitles } from 'shared/model/index/access-rights';
import { IndexValues } from 'shared/model/index/other';
import { iife } from 'shared/utils';
import { objectKeys } from 'shared/utils/object.utils';
import { StameskaIconName, stameskaIconPack } from 'stameska-icon/pack';
import rightTitlesFromFile from './rightTitles.json';

export const nounsFileStorage = new FileStore<NounPronsType>('/apps/index/nouns.json', { words: {} });
export const pronounsFileStorage = new FileStore<NounPronsType>('/apps/index/pronouns.json', { words: {} });

export const takeAccessRightTitles = (): IndexAppAccessRightTitles => rightTitlesFromFile;

export const indexStameskaIconsFileStore = new FileStore<typeof stameskaIconPack>('/stameska-icons', null as never);

export const appVersionFileStore = new FileStore<{ num: number }>('/+version.json', { num: 0 });
export const valuesFileStore = new FileStore<IndexValues>('/values', {});

export const sentEmailOTPFileStorage = new FileStore<
  { otp: number; ts: number; deviceId: DeviceId | nil; auth: LocalSokiAuth }[]
>('/apps/index/sentEmailOTP', []);

export const dashReportRecipientsFileStorage = new FileStore<PRecord<string, Langi>>(
  '/apps/index/dashReportRecipients',
  {},
);

export const otherFooterIconFileStore = new FileStore<{
  iconNames: StameskaIconName[];
  icon: StameskaIconName | nil;
  m: number;
}>('/apps/index/otherFooterIcon.json', { iconNames: [], icon: null, m: 0 });

iife(() => {
  const store = otherFooterIconFileStore.getValue();
  const existingIconNames = new Set(objectKeys(stameskaIconPack));
  const iconNames = store.iconNames.filter(iconName => existingIconNames.has(iconName));
  let isStoreChanged = iconNames.length !== store.iconNames.length;

  if (store.icon && !existingIconNames.has(store.icon)) {
    store.icon = null;
    isStoreChanged = true;
  }

  if (!isStoreChanged) return;

  store.iconNames = iconNames;
  otherFooterIconFileStore.saveValue();
});
