import { FileStore } from 'back/complect/FileStore';
import { NounPronsType } from 'back/complect/model';
import { DeviceId, LocalSokiAuth } from 'shared/api';
import { IndexValues } from 'shared/model/index/other';
import { stameskaIconPack } from 'stameska-icon/pack';
import * as rightTitlesFromFile from './rightTitles.json';

export const nounsFileStorage = new FileStore<NounPronsType>('/apps/index/nouns.json', { words: {} });
export const pronounsFileStorage = new FileStore<NounPronsType>('/apps/index/pronouns.json', { words: {} });

export const takeAccessRightTitles = () => rightTitlesFromFile;

export const indexStameskaIconsFileStore = new FileStore<typeof stameskaIconPack>('/stameska-icons', null as never);

export const appVersionFileStore = new FileStore<{ num: number }>('/+version.json', { num: 0 });
export const valuesFileStore = new FileStore<IndexValues>('/values', {});

export const sentEmailOTPFileStorage = new FileStore<
  { otp: number; ts: number; deviceId: DeviceId | nil; auth: LocalSokiAuth }[]
>('/apps/index/sentEmailOTP', []);
