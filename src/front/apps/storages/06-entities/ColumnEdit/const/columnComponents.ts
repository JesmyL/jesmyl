import { StoragesColumnEditComponents } from '$storages/shared/model/model';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesColumnEditOfTypeDate } from '../sub-ui/Date';
import { StoragesColumnEditOfTypeDates } from '../sub-ui/Dates';
import { StoragesColumnEditOfTypeFormula } from '../sub-ui/Formula';
import { StoragesColumnEditOfTypeLink } from '../sub-ui/Link';
import { StoragesColumnEditOfTypeList } from '../sub-ui/List';
import { StoragesColumnEditOfTypeNumber } from '../sub-ui/Number';
import { StoragesColumnEditOfTypeString } from '../sub-ui/String';
import { StoragesColumnEditOfTypeText } from '../sub-ui/Text';

export const storagesColumnEditComponents: StoragesColumnEditComponents = {
  [StoragesColumnType.Date]: StoragesColumnEditOfTypeDate,
  [StoragesColumnType.Dates]: StoragesColumnEditOfTypeDates,
  [StoragesColumnType.List]: StoragesColumnEditOfTypeList,
  [StoragesColumnType.Number]: StoragesColumnEditOfTypeNumber,
  [StoragesColumnType.String]: StoragesColumnEditOfTypeString,
  [StoragesColumnType.Link]: StoragesColumnEditOfTypeLink,
  [StoragesColumnType.Text]: StoragesColumnEditOfTypeText,
  [StoragesColumnType.Formula]: StoragesColumnEditOfTypeFormula,
};
