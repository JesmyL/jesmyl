import { StoragesColumnUiListKey } from 'shared/model/storages/ui.model';

export const storagesStylePropKeysMatrix = {
  marginTop: new Set([
    StoragesColumnUiListKey.MarginTopSmall,
    StoragesColumnUiListKey.MarginTopBig,
    StoragesColumnUiListKey.MarginTopLarge,
  ]),

  marginBottom: new Set([
    StoragesColumnUiListKey.MarginBottomSmall,
    StoragesColumnUiListKey.MarginBottomBig,
    StoragesColumnUiListKey.MarginBottomLarge,
  ]),

  fontSize: new Set([
    StoragesColumnUiListKey.FontSizeSmall,
    StoragesColumnUiListKey.FontSizeBig,
    StoragesColumnUiListKey.FontSizeLarge,
  ]),
};

export const storagesStypePropTitles: Record<keyof typeof storagesStylePropKeysMatrix, string> = {
  fontSize: 'Размер шрифта',
  marginTop: 'Отступ сверху',
  marginBottom: 'Отступ снизу',
};
