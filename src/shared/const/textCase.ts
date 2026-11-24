import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { TextCase } from 'shared/model/common';

export const defaultTextCase = TextCase.AsIs;

export const textCaseTitles: Record<
  TextCase,
  BaseLocaleKey.ConfigTextCaseCapitalize | BaseLocaleKey.ConfigTextCaseAsIs | BaseLocaleKey.ConfigTextCaseUppercase
> = {
  [TextCase.Capitalize]: BaseLocaleKey.ConfigTextCaseCapitalize,
  [TextCase.AsIs]: BaseLocaleKey.ConfigTextCaseAsIs,
  [TextCase.Uppercase]: BaseLocaleKey.ConfigTextCaseUppercase,
};
