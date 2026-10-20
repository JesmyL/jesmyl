import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { StoragesColumnUiListKey } from 'shared/model/storages/ui.model';
import { translateBase } from 'shared/utils/locale/base';

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
  get fontSize() {
    return translateBase(BaseLocaleKey.FontSize);
  },
  get marginTop() {
    return translateBase(BaseLocaleKey.StoragesMarginTop);
  },
  get marginBottom() {
    return translateBase(BaseLocaleKey.StoragesMarginBottom);
  },
};
