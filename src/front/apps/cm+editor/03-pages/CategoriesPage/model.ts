import { translateBase, translateEditorBase } from '#basis/locale';
import { CmCatKind } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';

export const enum CmEditorCategoriesModal {
  none,
  create,
  removed,
}

export const cmEditorCategoriesPageKindCodes = [CmCatKind.list, CmCatKind.dict];

const catKindTitles: Record<CmCatKind, () => string> = {
  [CmCatKind.dict]: () => translateEditorBase(EditorLocaleKey.Collections),
  [CmCatKind.list]: () => translateBase(BaseLocaleKey.Lists),
};

export const takeCmEditorCategoriesPageKindTitle = (kind: CmCatKind) => catKindTitles[kind]();

export const takeCmEditorCategoriesPageKindItems = () =>
  cmEditorCategoriesPageKindCodes.map(kind => ({
    id: kind,
    title: takeCmEditorCategoriesPageKindTitle(kind),
  }));
