import { Atom, atom } from 'atomaric';
import { EeStorePack } from 'shared/api';

export const cmEditorEERulesListBox = { list: [] } as { list: string[] };

export let cmEditorEERulesPageSizeAtom: Atom<number>;
export let cmEditorEERulesCurrentPageAtom: Atom<number>;
export let cmEditorEERulesIsCheckBibleAtom: Atom<boolean>;
export let cmEditorEERulesIsOpenSearchWordAtom: Atom<boolean>;
export let cmEditorEERulesEditedWordsAtom: Atom<EeStorePack>;

export const cmEditorEERulesInitAtoms = () => {
  cmEditorEERulesEditedWordsAtom ??= atom({});
  cmEditorEERulesPageSizeAtom ??= atom(50);
  cmEditorEERulesCurrentPageAtom ??= atom(0);
  cmEditorEERulesIsCheckBibleAtom ??= atom(false);
  cmEditorEERulesIsOpenSearchWordAtom ??= atom(false);
};
