import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellComponents } from '../model/model';
import { StoragesCellOfTypeDate } from '../sub-ui/Date';
import { StoragesCellOfTypeDates } from '../sub-ui/Dates';
import { StoragesCellOfTypeList } from '../sub-ui/List';
import { StoragesCellOfTypeNumber } from '../sub-ui/Number';

export const storagesCellComponents: StoragesCellComponents = {
  [StoragesColumnType.Date]: StoragesCellOfTypeDate,
  [StoragesColumnType.Dates]: StoragesCellOfTypeDates,
  [StoragesColumnType.List]: StoragesCellOfTypeList,
  [StoragesColumnType.Number]: StoragesCellOfTypeNumber,
};
