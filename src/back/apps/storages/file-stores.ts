import { DirStorage } from 'back/complect/DirStorage';
import { StoragesRackStorageSaved } from 'shared/model/storages/list.model';

export const storagesDirStore = new DirStorage({
  dirPath: '/apps/storages/list/',
  idKey: 'w',
  makeNewItem: (): StoragesRackStorageSaved => ({
    w: Date.now() + Math.random(),
    title: '',
    team: {},
    cards: [],
    statuses: [{ title: 'Новый' }],
    cols: [],
    dicts: [{ li: [''], title: 'База' }],
  }),
});
