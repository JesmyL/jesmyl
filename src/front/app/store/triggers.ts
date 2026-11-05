import { atom } from 'atomaric';
import { Eventer } from 'shared/utils';

export const appInitEvent = Eventer.createValue<void>();
export const localeIsLoadingAtom = atom(0, { do: () => ({}), map: num => Math.max(num, 0) });

/** Bumped when a fresh dictionary arrives: the route tree is remounted so non-reactive texts are read anew. */
export const localeForceUpdateAtom = atom(0);

/** The app stays blurred while the locale dictionaries are read from Cache Storage. */
export const localeIsBlurringAtom = atom(true);
