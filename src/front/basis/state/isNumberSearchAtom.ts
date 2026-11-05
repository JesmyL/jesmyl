import { atom } from 'atomaric';
import { CmComWid } from 'shared/api';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';

export const enum SearchMode {
  Text = 0,
  Number = 1,
  Smart = 2,
}

export const searchModeAtom = atom(SearchMode.Text, 'index:searchMode');

export const smartSearchFilterIdAtom = atom<BackLocaleKey | nil>(null);

export const smartSearchComwsAtom = atom<CmComWid[] | nil>(null);
