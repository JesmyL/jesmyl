import { FileStore } from 'back/complect/FileStore';
import { NounPronsType } from 'back/complect/model';
import { IndexValues } from 'shared/api';

export const nounsFileStore = new FileStore<NounPronsType>('/apps/index/nouns.json', { words: {} });
export const pronounsFileStore = new FileStore<NounPronsType>('/apps/index/pronouns.json', { words: {} });

export const appVersionFileStore = new FileStore<{ num: number }>('/+version.json', { num: 0 });
export const valuesFileStore = new FileStore<IndexValues>('/values', { chatUrl: '' });
