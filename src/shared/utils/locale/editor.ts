import type { LocaleCmEditor } from 'shared/model/+locale/editor';
import { translateBaseDefine } from './translate';

type CmEditorLocale = LocaleCmEditor;

let takeCmEditorLocale: () => CmEditorLocale = () => {
  throw 'setCmEditorLocaleProvider was never called';
};

// Provider must be registered before any module-scope translateEditorBase call.
export const setCmEditorLocaleProvider = (provider: () => CmEditorLocale) => {
  takeCmEditorLocale = provider;
};

export const translateEditorBase = translateBaseDefine(() => takeCmEditorLocale());
