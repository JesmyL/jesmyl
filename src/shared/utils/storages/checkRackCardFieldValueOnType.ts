import { StoragesFieldType, StoragesRackField } from 'shared/model/storages/rack.model';
import { smylib } from 'shared/utils';

export const storagesCheckRackCardFieldValueOnType = <Type extends StoragesFieldType>(type: Type, value: unknown) =>
  checkDict[type](value as never);

const checkDict: {
  [Type in StoragesFieldType]: (value: StoragesRackField<Type>['val']) => StoragesRackField<Type>['val'];
} = {
  [StoragesFieldType.Date]: value => (smylib.isNum(value) ? value : undefined),
  [StoragesFieldType.Dates]: value => (smylib.isArr(value) ? value : []),
  [StoragesFieldType.List]: value => (smylib.isArr(value) ? value : []),
  [StoragesFieldType.Price]: value => (smylib.isObj(value) ? value : { am: '' }),
};

export const storagesFieldValueDefaultValueDict: {
  [Type in StoragesFieldType]: StoragesRackField<Type>;
} = {
  [StoragesFieldType.Date]: {
    t: StoragesFieldType.Date,
    val: undefined,
  },
  [StoragesFieldType.Dates]: {
    t: StoragesFieldType.Dates,
    val: [],
  },
  [StoragesFieldType.List]: {
    t: StoragesFieldType.List,
    val: [],
  },
  [StoragesFieldType.Price]: {
    t: StoragesFieldType.Price,
    val: { am: '' },
  },
};
