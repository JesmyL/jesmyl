import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { TextCase } from 'shared/model/common';

export const defaultTextCase = TextCase.Capitalize;

export const textCaseTitles: Record<
  TextCase,
  BaseLocaleKey.ConfigTextCaseCapitalize | BaseLocaleKey.ConfigTextCaseAsIs | BaseLocaleKey.ConfigTextCaseUppercase
> = {
  [TextCase.Capitalize]: BaseLocaleKey.ConfigTextCaseCapitalize,
  [TextCase.AsIs]: BaseLocaleKey.ConfigTextCaseAsIs,
  [TextCase.Uppercase]: BaseLocaleKey.ConfigTextCaseUppercase,
};
