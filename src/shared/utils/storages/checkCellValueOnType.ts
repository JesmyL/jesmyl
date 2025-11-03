import { StoragesCell, StoragesColumnType } from 'shared/model/storages/rack.model';
import { smylib } from 'shared/utils';
import { storagesCheckStringValueIsLink } from 'shared/utils/storages/cellIncorrectValueNode';

export const storagesCheckCellValueOnType = <Type extends StoragesColumnType>(type: Type, value: unknown) =>
  checkDict[type](value as never);

const checkDict: {
  [Type in StoragesColumnType]: (value: StoragesCell<Type>['val']) => StoragesCell<Type>['val'];
} = {
  [StoragesColumnType.Date]: value => (smylib.isNum(value) || smylib.isStr(value) ? +value : undefined),
  [StoragesColumnType.Dates]: () => undefined,
  [StoragesColumnType.List]: value => (smylib.isArr(value) ? value : []),
  [StoragesColumnType.Number]: value => (smylib.isNum(value) ? value : 0),
  [StoragesColumnType.String]: value => (smylib.isStr(value) ? value.trim() : ''),
  [StoragesColumnType.Link]: value => (storagesCheckStringValueIsLink(value) ? value : ''),
};
