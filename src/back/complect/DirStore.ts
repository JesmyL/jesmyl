import { backConfig } from 'back/config/backConfig';
import fs from 'fs';
import { FileStore } from './FileStore';

const initialFileDir = `${__dirname}${backConfig.fileStoreDir}`;

export class DirStore<Item extends Record<IdKey, Id>, Id extends string | number, IdKey extends string = 'w'> {
  ids: Id[];
  createItem: (mapper?: (item: Item) => Item, id?: Id) => { item: Item; mod: number };
  updateItem: (id: Id, updater: (item: Item) => void) => { item: Item; mod: number };

  private getFileStore: (id: Id) => FileStore<Item>;
  private updateCahceTime: (id: Id) => void = () => {};

  constructor({
    makeNewItem,
    dirPath,
    cacheTime = 3 * 60 * 60 * 60 * 1000,
    idKey = 'w' as never as IdKey,
  }: {
    dirPath: `/${string}/`;
    makeNewItem: () => Item;
    cacheTime?: number;
    idKey?: IdKey;
  }) {
    const first = makeNewItem();
    const second = makeNewItem();

    if (
      first === second ||
      Object.entries(first).some(
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

      if (!fs.existsSync(`${absoluteDirPath}${id}.json`)) throw `No id ${id} in ${dirPath}`;

      fileStores[id] = new FileStore(`${dirPath}${id}.json`, makeNewItem());

      return fileStores[id];
    };

    this.createItem = (newItemMapper = retItem, id) => {
      const newItem = newItemMapper(makeNewItem());

      id ??= newItem[idKey];
      id = (typeof id === 'number' ? +`${id}` : id) as Id;

      const item = (fileStores[id] = new FileStore(`${dirPath}${id}.json`, {
        ...newItem,
        [idKey]: id,
      }));

      return {
        item: item.getValue(),
        mod: this.saveItem(id),
      };
    };

    this.updateItem = (id, updater) => {
      const item = this.getItem(id);
      updater(item);

      return { item, mod: this.saveItem(id) };
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

    this.ids.forEach(this.getItemModTime);
  }

  getItem = (id: Id) => this.getFileStore(id).getValue();

  saveItem = (id: Id) => {
    this.getFileStore(id).saveValue();
    return this.getItemModTime(id);
  };

  getItemModTime = (id: Id) => this.getFileStore(id).fileModifiedAt();

  getFreshItems = (lastModfiedAt: number) => {
    const items: Item[] = [];
    let maxMod = lastModfiedAt;

    for (const id of this.ids) {
      const itemModTime = this.getItemModTime(id);

      if (itemModTime > lastModfiedAt) {
        if (itemModTime > maxMod) maxMod = itemModTime;
        items.push(this.getItem(id));
      }
    }

    return { items: items, maxMod };
  };
}
