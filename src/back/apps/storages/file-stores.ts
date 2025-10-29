import { DirStore } from 'back/complect/DirStore';
import { StoragesRack } from 'shared/model/storages/list.model';

export const storagesDirStore = new DirStore({
  dirPath: '/apps/storages/list/',
  makeNewItem: (): StoragesRack => ({
    w: Date.now() + Math.random(),
    title: '',
    team: {},
    list: [],
    statuses: [{ title: 'Новый' }],
    fields: [],
    values: [],
  }),
});
