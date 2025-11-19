import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesColumnCreateComponents } from '../model/model';
import { StoragesColumnCreateOfTypeDate } from '../types-ui/Date';
import { StoragesColumnCreateOfTypeDates } from '../types-ui/Dates';
import { StoragesColumnCreateOfTypeFormula } from '../types-ui/Formula';
import { StoragesColumnCreateOfTypeLink } from '../types-ui/Link';
import { StoragesColumnCreateOfTypeList } from '../types-ui/List';
import { StoragesColumnCreateOfTypeNumber } from '../types-ui/Number';
import { StoragesColumnCreateOfTypeString } from '../types-ui/String';
import { StoragesColumnCreateOfTypeText } from '../types-ui/Text';

export const storagesColumnCreateComponents: StoragesColumnCreateComponents = {
  [StoragesColumnType.Date]: StoragesColumnCreateOfTypeDate,
  [StoragesColumnType.Dates]: StoragesColumnCreateOfTypeDates,
  [StoragesColumnType.List]: StoragesColumnCreateOfTypeList,
  [StoragesColumnType.Number]: StoragesColumnCreateOfTypeNumber,
  [StoragesColumnType.String]: StoragesColumnCreateOfTypeString,
  [StoragesColumnType.Link]: StoragesColumnCreateOfTypeLink,
  [StoragesColumnType.Text]: StoragesColumnCreateOfTypeText,
  [StoragesColumnType.Formula]: StoragesColumnCreateOfTypeFormula,
};
