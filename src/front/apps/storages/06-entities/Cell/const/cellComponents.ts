import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellComponents } from '../model/model';
import { StoragesCellOfTypeDate } from '../sub-ui/Date';
import { StoragesCellOfTypeDates } from '../sub-ui/Dates';
import { StoragesCellOfTypeFormula } from '../sub-ui/Formula';
import { StoragesCellOfTypeLink } from '../sub-ui/Link';
import { StoragesCellOfTypeList } from '../sub-ui/List';
import { StoragesCellOfTypeNumber } from '../sub-ui/Number';
import { StoragesCellOfTypeString } from '../sub-ui/String';
import { StoragesCellOfTypeText } from '../sub-ui/Text';

export const storagesCellComponents: StoragesCellComponents = {
  [StoragesColumnType.Date]: StoragesCellOfTypeDate,
  [StoragesColumnType.Dates]: StoragesCellOfTypeDates,
  [StoragesColumnType.List]: StoragesCellOfTypeList,
  [StoragesColumnType.Number]: StoragesCellOfTypeNumber,
  [StoragesColumnType.String]: StoragesCellOfTypeString,
  [StoragesColumnType.Link]: StoragesCellOfTypeLink,
  [StoragesColumnType.Text]: StoragesCellOfTypeText,
  [StoragesColumnType.Formula]: StoragesCellOfTypeFormula,
};
