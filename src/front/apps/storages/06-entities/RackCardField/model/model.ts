import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';
import {
  StoragesFieldNestedSelectors,
  StoragesFieldType,
  StoragesRackDefinitionField,
  StoragesRackField,
} from 'shared/model/storages/rack.model';

export type StoragesRackCardFieldComponents = {
  [Type in StoragesFieldType]: (props: StoragesRackCardFieldTypeProps<Type>) => React.ReactNode;
};

export type StoragesRackCardFieldTypeProps<Type extends StoragesFieldType> = {
  rackField: StoragesRackDefinitionField;
  cardField: StoragesRackField<Type> | nil;
  card: StoragesRackCard;
  rack: StoragesRack;
  fieldi: number;

  nestedSelectors?: StoragesFieldNestedSelectors;
};
