import { TextCase } from 'shared/model/common';

export const defaultTextCase = TextCase.Capitalize;

export const textCaseTitles: { [Id in TextCase]: string } = {
  [TextCase.Capitalize]: 'Один два',
  [TextCase.AsIs]: 'один Два',
  [TextCase.Uppercase]: 'ОДИН ДВА',
};
