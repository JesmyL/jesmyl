import { StoragesRack } from 'shared/model/storages/list.model';
import { StoragesColumnType, StoragesDictItemi, StoragesRackColumn } from 'shared/model/storages/rack.model';
import { checkIsString } from '../checkIs';

export const makeStoragesDictValue = (
  value: string | StoragesDictItemi | nil,
  column: StoragesRackColumn<StoragesColumnType.String | StoragesColumnType.List>,
  rack: StoragesRack,
) => {
  return checkIsString(value) || value == null ? value : rack.dicts[column.di ?? 0].li[value];
};
