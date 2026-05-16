import { DexieDB } from '#shared/lib/DexieDB';
import { MyFileBox } from '../model/common';

type Storage = {
  files: MyFileBox[];
};

export const myFilesIDB = new (class MyFilesIDB extends DexieDB<Storage> {
  constructor() {
    super('myFiles', {
      files: {
        id: '++',
        type: true,
        'file.name': true,
      },
    });
  }
})();
