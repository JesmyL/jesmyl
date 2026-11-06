import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

/** Readable name of every open com list mode: the selector and the player toasts show the same one. */
export const cmComListPackKindSelectorLocaleKeyDict = {
  all: BaseLocaleKey.CmListsAll,
  fav: BaseLocaleKey.Favorite,
  sel: BaseLocaleKey.Selected,
  cached: BaseLocaleKey.Cached,
} as const;
