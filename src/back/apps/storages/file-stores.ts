import { DirStorage } from 'back/complect/DirStorage';
import { StoragesRack } from 'shared/model/storages/list.model';

export const storagesDirStore = new DirStorage({
  dirPath: '/apps/storages/list/',
  idKey: 'w',
  makeNewItem: (): StoragesRack => ({
    w: Date.now() + Math.random(),
    title: '',
    team: {},
    cards: [],
    statuses: [{ title: 'Новый' }],
    cols: [],
    values: [],
  }),
});
