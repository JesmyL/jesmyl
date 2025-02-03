import { ServerStoreContent } from 'shared/api';

export * from './AnAtom';
export * from './Atom';

export interface IMoleculeFractionalStore<Value> {
  contentValuePrefix: `${string}/${string}::`;
  lastWriteTsPrefix: string;
  onFreshServerStoreContentChange: (content: ServerStoreContent<Value>) => void;
  updateServerStoreContent: (content: ServerStoreContent<Value>) => void;
  insertContents: (ts: number, contents: ServerStoreContent<Value>[]) => void;
}

export interface MoleculeOptions<T> {
  serverStored?: (keyof T)[];
  dynamicStores?: Record<`${string}::`, IMoleculeFractionalStore<any>>;
}
