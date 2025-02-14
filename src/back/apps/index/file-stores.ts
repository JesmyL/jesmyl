import { FileStore } from 'back/complect/FileStore';
import { IndexValues, NounPronsType } from 'shared/api';

export const nounPronsWordsFileStore = new FileStore<NounPronsType>('/apps/index/nounPronsWords.json', {
  nouns: {},
  pronouns: {},
});

export const appVersionFileStore = new FileStore<{ num: number }>('/+version.json', { num: 0 });
export const valuesFileStore = new FileStore<IndexValues>('/values', { chatUrl: '' });
