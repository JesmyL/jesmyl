import { backConfig } from 'back/config/backConfig';
import fs from 'fs';
import { smylib } from 'shared/utils';
import { FileStore } from './FileStore';

const initialFileDir = `${__dirname}${backConfig.fileStoreDir}`;

export class DirStorage<Item extends Record<IdKey, Id>, Id extends string | number, IdKey extends string = 'w'> {
  ids: Id[];
  createItem: (mapper?: ((item: Item) => Item) | nil, id?: Id) => { item: Item; mod: number };
  updateItem: (id: Id, updater: (item: Item) => void) => { item: Item; mod: number } | nil;

  private getFileStore: (id: Id) => FileStore<Item> | nil;
  private updateCahceTime: (id: Id) => void = () => {};

  constructor({
    makeNewItem,
    dirPath,
    cacheTime = 3 * 60 * 60 * 60 * 1000,
    idKey,
  }: {
    dirPath: `/${string}/`;
    makeNewItem: () => Item;
    cacheTime?: number;
    idKey: IdKey;
  }) {
    const firstCreatedItem = makeNewItem();
    const second = makeNewItem();

    if (
      firstCreatedItem === second ||
      Object.entries(firstCreatedItem).some(
        ([key, val]) =>
          typeof second === 'object' &&
          key in second &&
          typeof second[key as never] === 'object' &&
          second[key as never] === val,
      )
    )
      throw `The makeNewItem() must return unique object any time!`;

    const absoluteDirPath = `${initialFileDir}${dirPath}`;
    const fileStores: Partial<Record<Id, FileStore<Item>>> = {};
    const retItem = () => makeNewItem();
    const makeIdFromFileName = (fileName: string) => fileName.slice(0, -5);

    clearTimeout(setTimeout(retItem, cacheTime));

    this.getFileStore = id => {
      this.updateCahceTime(id);

      if (fileStores[id] !== undefined) return fileStores[id];

      if (!fs.existsSync(`${absoluteDirPath}${id}.json`)) return null;

      fileStores[id] = new FileStore(`${dirPath}${id}.json`, makeNewItem());

      return fileStores[id];
    };

    this.createItem = (newItemMapper, id) => {
      const newItem = (newItemMapper ?? retItem)(makeNewItem());

      id ??= newItem[idKey];
      id = (typeof id === 'number' ? +`${id}` : id) as Id;

      const item = (fileStores[id] = new FileStore(`${dirPath}${id}.json`, {
        ...newItem,
        [idKey]: id,
      }));

      return {
        item: item.getValue(),
        mod: this.saveItem(id)!,
      };
    };

    this.updateItem = (id, updater) => {
      const item = this.getItem(id);
      if (item == null) return null;
      updater(item);

      return { item, mod: this.saveItem(id)! };
    };

    if (cacheTime < 0) {
      const timeouts: Partial<Record<Id, ReturnType<typeof setTimeout>>> = {};
      const deleter = (id: Id) => delete fileStores[id];

      this.updateCahceTime = id => {
        clearTimeout(timeouts[id]);
        timeouts[id] = setTimeout(deleter, cacheTime, id);
      };
    }

    try {
      this.ids = fs.readdirSync(absoluteDirPath).map(makeIdFromFileName) as Id[];
    } catch (_e) {
      const createdId = this.createItem(undefined, '--NEW_ID--' as never).item[idKey];

      setTimeout(() => delete fileStores[createdId]);
      fs.unlinkSync(`${absoluteDirPath}${createdId}.json`);

      try {
        this.ids = fs.readdirSync(absoluteDirPath).map(makeIdFromFileName) as Id[];
      } catch (_e) {
        this.ids = [];
      }
    }

    if (smylib.isNum(firstCreatedItem[idKey])) this.ids = this.ids.map(id => (smylib.isNaN(+id) ? id : +id)) as never;
    this.ids.forEach(this.getItemModTime);
  }

  getItem = (id: Id) => {
    try {
      return this.getFileStore(id)?.getValue();
    } catch (_) {
      return null;
    }
  };

  getOrCreateItem = (id: Id, ...createArgs: Parameters<typeof this.createItem>) => {
    try {
      return this.getFileStore(id)!.getValue();
    } catch (_) {
      return this.createItem(...createArgs).item;
    }
  };

  deleteItem = (id: Id) => this.getFileStore(id)?.deleteFile();

  saveItem = (id: Id) => {
    this.getFileStore(id)?.saveValue();
    return this.getItemModTime(id);
  };

  getItemModTime = (id: Id) => this.getFileStore(id)?.fileModifiedAt();

  getAllItems = () => {
    const items = [];
    for (const id of this.ids) {
      const item = this.getItem(id);
      if (item == null) continue;
      items.push(item);
    }
    return items;
  };

  getFreshItems = (lastModfiedAt: number) => {
    const items: Item[] = [];
    let maxMod = lastModfiedAt;

    for (const id of this.ids) {
      const itemModTime = this.getItemModTime(id);

      if (itemModTime == null || itemModTime <= lastModfiedAt) continue;

      if (itemModTime > maxMod) maxMod = itemModTime;
      const item = this.getItem(id);
      if (item != null) items.push(item);
    }

    return { items: items, maxMod };
  };

  getAllIds = () => this.ids;
}
