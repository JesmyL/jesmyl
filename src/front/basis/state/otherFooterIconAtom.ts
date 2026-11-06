import { atom } from 'atomaric';
import { StameskaIconName } from 'stameska-icon/pack';

export const otherFooterIconAtom = atom<StameskaIconName | nil>(null, 'index:otherFooterIcon');
export const otherFooterIconNamesAtom = atom<StameskaIconName[]>([], 'index:otherFooterIconNames');
