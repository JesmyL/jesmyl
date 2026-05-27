import { TextCase } from 'shared/model/common';

export const defaultTextCase = TextCase.Capitalize;

export const textCaseTitles: { [Id in TextCase]: string } = {
  [TextCase.Capitalize]: 'Первое с большой',
  [TextCase.AsIs]: 'так Как есть',
  [TextCase.Uppercase]: 'ВСЕ С БОЛЬШОЙ',
};
