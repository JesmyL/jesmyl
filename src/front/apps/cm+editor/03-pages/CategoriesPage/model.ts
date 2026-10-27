import { translateBase } from '#basis/locale';
import { CmCatKind } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const enum CmEditorCategoriesModal {
  none,
  create,
  removed,
}

export const cmEditorCategoriesPageKindCodes = [CmCatKind.list, CmCatKind.dict];

const catKindLocaleKeys: Record<CmCatKind, BaseLocaleKey> = {
  [CmCatKind.dict]: BaseLocaleKey.Collections,
  [CmCatKind.list]: BaseLocaleKey.Lists,
};

export const takeCmEditorCategoriesPageKindTitle = (kind: CmCatKind) => translateBase(catKindLocaleKeys[kind]);

export const takeCmEditorCategoriesPageKindItems = () =>
  cmEditorCategoriesPageKindCodes.map(kind => ({
    id: kind,
    title: takeCmEditorCategoriesPageKindTitle(kind),
  }));
