import { StoragesColumnType } from 'shared/model/storages/rack.model';

export const storagesExcludeColumnTypesForDatedNestedCell = new Set([
  StoragesColumnType.Date,
  StoragesColumnType.Dates,
]);
