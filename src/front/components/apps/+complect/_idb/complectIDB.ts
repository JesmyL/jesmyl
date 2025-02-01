import { DexieDB } from 'front/complect/_DexieDB';
import { AlertLineConfig } from '../translations/model';

type Store = {
  alertLineConfigs: AlertLineConfig[];
};

export const complectIDB = new DexieDB<Store>('complect', {
  alertLineConfigs: {
    id: '++',
  },
});
