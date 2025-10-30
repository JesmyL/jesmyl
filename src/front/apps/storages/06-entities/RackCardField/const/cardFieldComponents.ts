import { StoragesFieldType } from 'shared/model/storages/rack.model';
import { StoragesRackCardFieldComponents } from '../model/model';
import { StoragesRackCardFieldOfTypeDate } from '../sub-ui/DateField';
import { StoragesRackCardFieldOfTypeDates } from '../sub-ui/DatesField';
import { StoragesRackCardFieldOfTypeList } from '../sub-ui/ListField';
import { StoragesRackCardFieldOfTypePrice } from '../sub-ui/PriceField';

export const storagesRackCardFieldComponents: StoragesRackCardFieldComponents = {
  [StoragesFieldType.Date]: StoragesRackCardFieldOfTypeDate,
  [StoragesFieldType.Dates]: StoragesRackCardFieldOfTypeDates,
  [StoragesFieldType.List]: StoragesRackCardFieldOfTypeList,
  [StoragesFieldType.Price]: StoragesRackCardFieldOfTypePrice,
};
